import { NextResponse } from "next/server";

export const runtime = "nodejs";

const systemInstruction = `Bạn là trợ lý hỗ trợ tư duy phản biện bằng tiếng Việt. Phân tích nội dung người dùng cung cấp, không khẳng định thông tin là đúng nếu không có bằng chứng trực tiếp. Phân biệt sự kiện, diễn giải, ý kiến và thông tin chưa đủ dữ kiện. Không bịa nguồn hoặc URL. Vì bản miễn phí này không tự duyệt web, trường sources phải là mảng rỗng. Trả về JSON thuần theo đúng schema được yêu cầu.`;

type Analysis = {
  verdict: string;
  summary: string;
  claims: { claim: string; assessment: string; confidence: string }[];
  cautions: string[];
  searchQueries: string[];
  sources: { title: string; url: string; reason: string }[];
  reminder: string;
};

function normalize(raw: unknown): Analysis {
  const value = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const text = (input: unknown) => typeof input === "string" ? input.trim() : "";
  const list = (input: unknown) => Array.isArray(input) ? input : [];
  const verdicts = new Set(["Có cơ sở", "Chưa đủ bằng chứng", "Có dấu hiệu sai lệch", "Không thể kết luận"]);
  const verdict = text(value.verdict);

  return {
    verdict: verdicts.has(verdict) ? verdict : "Không thể kết luận",
    summary: text(value.summary) || "Chưa có đủ dữ kiện để đưa ra kết luận đáng tin cậy.",
    claims: list(value.claims).slice(0, 4).map((item) => {
      const claim = text((item as Record<string, unknown>)?.claim);
      const assessment = text((item as Record<string, unknown>)?.assessment);
      const confidence = text((item as Record<string, unknown>)?.confidence);
      return { claim, assessment, confidence: confidence || "thấp" };
    }).filter((item) => item.claim),
    cautions: list(value.cautions).slice(0, 4).map(text).filter(Boolean),
    searchQueries: list(value.searchQueries).slice(0, 4).map(text).filter(Boolean),
    sources: [],
    reminder: text(value.reminder) || "Hãy đọc nguồn gốc, kiểm tra tác giả, ngày xuất bản và bối cảnh trước khi chia sẻ.",
  };
}

export async function POST(request: Request) {
  const { prompt } = await request.json().catch(() => ({}));
  if (typeof prompt !== "string" || prompt.trim().length < 20 || prompt.length > 12000) {
    return NextResponse.json({ error: "Nội dung cần có từ 20 đến 12.000 ký tự." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Chưa cấu hình GEMINI_API_KEY trên máy chủ." }, { status: 503 });
  }

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ parts: [{ text: prompt.trim() }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              verdict: { type: "STRING" },
              summary: { type: "STRING" },
              claims: { type: "ARRAY", items: { type: "OBJECT", properties: { claim: { type: "STRING" }, assessment: { type: "STRING" }, confidence: { type: "STRING" } }, required: ["claim", "assessment", "confidence"] } },
              cautions: { type: "ARRAY", items: { type: "STRING" } },
              searchQueries: { type: "ARRAY", items: { type: "STRING" } },
              reminder: { type: "STRING" },
            },
            required: ["verdict", "summary", "claims", "cautions", "searchQueries", "reminder"],
          },
        },
      }),
      signal: AbortSignal.timeout(45_000),
    });
    if (!response.ok) {
      return NextResponse.json({ error: "Gemini hiện không phản hồi. Hãy thử lại sau." }, { status: 502 });
    }
    const payload = await response.json();
    const content = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof content !== "string") throw new Error("Invalid Gemini response");
    return NextResponse.json({ analysis: normalize(JSON.parse(content)) });
  } catch {
    return NextResponse.json({ error: "Không thể phân tích nội dung lúc này. Hãy thử lại sau." }, { status: 502 });
  }
}
