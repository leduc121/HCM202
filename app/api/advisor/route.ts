import { NextResponse } from "next/server";

export const runtime = "nodejs";

const systemInstruction = `Bạn là advisor kiểm chứng đầu ra AI bằng tiếng Việt. Mục tiêu là giúp người học tự kết luận, không thay họ kết luận. Bắt buộc suy luận theo SIFT: (1) Dừng lại để xác định điều đang được khẳng định, (2) Tìm nguồn gốc hoặc nguồn có thẩm quyền, (3) Đối chiếu với nguồn độc lập, (4) Lần về văn bản, dữ liệu và ngữ cảnh gốc. Sau đó dùng CRAAP để đánh giá Currency, Relevance, Authority, Accuracy, Purpose. Phân biệt rõ sự kiện, diễn giải, ý kiến và dữ kiện còn thiếu. Chỉ dùng verdict “Có cơ sở” khi bằng chứng web thu được trực tiếp đủ mạnh. Không có bằng chứng thì ưu tiên “Chưa đủ bằng chứng” hoặc “Không thể kết luận”. Không bịa nguồn, URL, tác giả hoặc chi tiết. Trả về JSON thuần, không markdown, theo schema được yêu cầu.`;
type Source = { title: string; url: string; reason: string };
type Analysis = { verdict: string; summary: string; claims: { claim: string; assessment: string; confidence: string }[]; cautions: string[]; searchQueries: string[]; sources: Source[]; reminder: string };
const text = (input: unknown) => typeof input === "string" ? input.trim() : "";
const list = (input: unknown) => Array.isArray(input) ? input : [];
function safeUrl(input: unknown) { try { const url = new URL(text(input)); return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : ""; } catch { return ""; } }
function normalize(raw: unknown, sources: Source[]): Analysis {
  const value = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const verdict = text(value.verdict); const allowed = new Set(["Có cơ sở", "Chưa đủ bằng chứng", "Có dấu hiệu sai lệch", "Không thể kết luận"]);
  return { verdict: allowed.has(verdict) ? verdict : "Không thể kết luận", summary: text(value.summary) || "Chưa có đủ dữ kiện để đưa ra kết luận đáng tin cậy.", claims: list(value.claims).slice(0, 4).map((item) => { const claim = text((item as Record<string, unknown>)?.claim); return { claim, assessment: text((item as Record<string, unknown>)?.assessment), confidence: text((item as Record<string, unknown>)?.confidence) || "thấp" }; }).filter((item) => item.claim), cautions: list(value.cautions).slice(0, 4).map(text).filter(Boolean), searchQueries: list(value.searchQueries).slice(0, 4).map(text).filter(Boolean), sources, reminder: text(value.reminder) || "Trước khi dùng kết quả, hãy mở nguồn gốc, kiểm tra tác giả, ngày xuất bản và bối cảnh." };
}
function groundedSources(payload: Record<string, unknown>): Source[] {
  const candidate = list(payload.candidates)[0] as Record<string, unknown> | undefined;
  const metadata = candidate?.groundingMetadata as Record<string, unknown> | undefined;
  const seen = new Set<string>();
  return list(metadata?.groundingChunks).map((chunk) => { const web = (chunk as Record<string, unknown>)?.web as Record<string, unknown> | undefined; return { title: text(web?.title) || "Nguồn web được Gemini đối chiếu", url: safeUrl(web?.uri), reason: "Nguồn được dùng để đối chiếu trong lượt phân tích này." }; }).filter((source): source is Source => Boolean(source.url) && !seen.has(source.url) && (seen.add(source.url), true)).slice(0, 5);
}
export async function POST(request: Request) {
  const { prompt } = await request.json().catch(() => ({}));
  if (typeof prompt !== "string" || prompt.trim().length < 20 || prompt.length > 12000) return NextResponse.json({ error: "Nội dung cần có từ 20 đến 12.000 ký tự." }, { status: 400 });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Chưa cấu hình GEMINI_API_KEY trên máy chủ." }, { status: 503 });
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent", { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey }, body: JSON.stringify({ systemInstruction: { parts: [{ text: systemInstruction }] }, contents: [{ parts: [{ text: `Đây là đầu ra cần kiểm chứng của một AI khác:\n\n${prompt.trim()}` }] }], tools: [{ google_search: {} }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { verdict: { type: "STRING", enum: ["Có cơ sở", "Chưa đủ bằng chứng", "Có dấu hiệu sai lệch", "Không thể kết luận"] }, summary: { type: "STRING" }, claims: { type: "ARRAY", items: { type: "OBJECT", properties: { claim: { type: "STRING" }, assessment: { type: "STRING" }, confidence: { type: "STRING" } }, required: ["claim", "assessment", "confidence"] } }, cautions: { type: "ARRAY", items: { type: "STRING" } }, searchQueries: { type: "ARRAY", items: { type: "STRING" } }, reminder: { type: "STRING" } }, required: ["verdict", "summary", "claims", "cautions", "searchQueries", "reminder"] } } }), signal: AbortSignal.timeout(45_000) });
    if (!response.ok) return NextResponse.json({ error: "Gemini hiện không phản hồi. Hãy thử lại sau." }, { status: 502 });
    const payload = await response.json() as Record<string, unknown>;
    const candidate = list(payload.candidates)[0] as Record<string, unknown> | undefined;
    const content = candidate?.content as Record<string, unknown> | undefined;
    const raw = text((list(content?.parts)[0] as Record<string, unknown> | undefined)?.text);
    if (!raw) throw new Error("Invalid Gemini response");
    return NextResponse.json({ analysis: normalize(JSON.parse(raw), groundedSources(payload)) });
  } catch { return NextResponse.json({ error: "Không thể phân tích nội dung lúc này. Hãy thử lại sau." }, { status: 502 }); }
}
