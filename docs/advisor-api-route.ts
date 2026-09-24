import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `Bạn là một trợ lý hỗ trợ tư duy phản biện bằng tiếng Việt. Không được tự nhận đã xác minh một sự thật nếu không có nguồn trực tiếp. Phân tích nội dung người dùng cung cấp, tách các luận điểm có thể kiểm chứng, nêu điểm cần thận trọng và đề xuất truy vấn/nguồn đáng tin cậy. Luôn phân biệt sự kiện, diễn giải, ý kiến và thông tin chưa đủ dữ kiện. Khi đưa URL nguồn, chỉ dùng URL đầy đủ mà bạn có cơ sở tin cậy; không bịa URL. Trả về JSON thuần, không markdown, đúng dạng: {"verdict":"Có cơ sở|Chưa đủ bằng chứng|Có dấu hiệu sai lệch|Không thể kết luận","summary":"...","claims":[{"claim":"...","assessment":"...","confidence":"thấp|trung bình|cao"}],"cautions":["..."],"searchQueries":["..."],"sources":[{"title":"...","url":"https://...","reason":"..."}],"reminder":"..."}. Có tối đa 4 claims, 4 cautions, 4 queries và 5 sources.`;

function parseAnalysis(content: string) {
  const cleaned = content.replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
  const parsed = JSON.parse(cleaned);
  const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
  const list = (value: unknown) => Array.isArray(value) ? value : [];
  const safeUrl = (value: unknown) => {
    try {
      const url = new URL(text(value));
      return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
    } catch { return ""; }
  };
  return {
    verdict: text(parsed.verdict) || "Không thể kết luận",
    summary: text(parsed.summary) || "Kết quả chưa có đủ dữ kiện để tóm tắt.",
    claims: list(parsed.claims).slice(0, 4).map((item) => ({ claim: text(item?.claim), assessment: text(item?.assessment), confidence: text(item?.confidence) || "thấp" })).filter((item) => item.claim),
    cautions: list(parsed.cautions).slice(0, 4).map(text).filter(Boolean),
    searchQueries: list(parsed.searchQueries).slice(0, 4).map(text).filter(Boolean),
    sources: list(parsed.sources).slice(0, 5).map((item) => ({ title: text(item?.title), url: safeUrl(item?.url), reason: text(item?.reason) })).filter((item) => item.title && item.url),
    reminder: text(parsed.reminder) || "Hãy mở nguồn gốc, kiểm tra tác giả, ngày xuất bản và bối cảnh trước khi chia sẻ.",
  };
}

export async function POST(request: Request) {
  const { prompt } = await request.json().catch(() => ({}));
  if (typeof prompt !== "string" || prompt.trim().length < 20 || prompt.length > 12000) {
    return NextResponse.json({ error: "Nội dung cần có từ 20 đến 12.000 ký tự." }, { status: 400 });
  }
  const endpoint = process.env.ADVISOR_API_URL;
  const apiKey = process.env.ADVISOR_API_KEY;
  const model = process.env.ADVISOR_MODEL;
  if (!endpoint || !apiKey || !model) {
    return NextResponse.json({ error: "Chưa cấu hình dịch vụ phân tích. Hãy thêm ADVISOR_API_URL, ADVISOR_API_KEY và ADVISOR_MODEL vào .env.local." }, { status: 503 });
  }
  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, temperature: 0.2, messages: [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: prompt.trim() }] }),
      signal: AbortSignal.timeout(45_000),
    });
    if (!upstream.ok) return NextResponse.json({ error: "Dịch vụ phân tích đang không phản hồi. Hãy thử lại sau." }, { status: 502 });
    const data = await upstream.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string") throw new Error("Invalid provider response");
    return NextResponse.json({ analysis: parseAnalysis(content) });
  } catch {
    return NextResponse.json({ error: "Không thể đọc kết quả từ dịch vụ phân tích. Hãy kiểm tra cấu hình API và thử lại." }, { status: 502 });
  }
}
