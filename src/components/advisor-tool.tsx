"use client";

import { FormEvent, useState } from "react";
import { AlertTriangle, ArrowUpRight, Check, Search, ShieldQuestion } from "lucide-react";
import styles from "./advisor-tool.module.css";

type Source = { title: string; url: string; reason: string };
const googleSearchUrl = (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query)}`;

type Analysis = {
  verdict: "Có cơ sở" | "Chưa đủ bằng chứng" | "Có dấu hiệu sai lệch" | "Không thể kết luận";
  summary: string;
  claims: { claim: string; assessment: string; confidence: string }[];
  cautions: string[];
  searchQueries: string[];
  sources: Source[];
  reminder: string;
};

const advisorEndpoint = process.env.NEXT_PUBLIC_ADVISOR_API_URL;

export function AdvisorTool() {
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = prompt.trim();
    if (text.length < 20) { setError("Hãy nhập ít nhất 20 ký tự để có đủ ngữ cảnh phân tích."); return; }
    setError(""); setAnalysis(null);
    if (!advisorEndpoint) {
      setError("Công cụ phân tích chưa được cấu hình trên bản GitHub Pages.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(advisorEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: text }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Không thể hoàn tất phân tích.");
      setAnalysis(payload.analysis);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Không thể kết nối dịch vụ phân tích."); }
    finally { setLoading(false); }
  }

  return (
    <section className={styles.shell} aria-labelledby="advisor-heading">
      <div className={styles.intro}>
        <p className={styles.sectionNumber}>02 / PHÂN TÍCH</p>
        <h2 id="advisor-heading">Đưa một thông tin vào bàn kiểm chứng.</h2>
        <p>Đây là công cụ hỗ trợ tư duy phản biện, không thay thế việc đọc nguồn gốc hoặc kết luận chuyên môn.</p>
      </div>
      <form className={styles.form} onSubmit={submit}>
        <label htmlFor="claim">Thông tin cần kiểm tra</label>
        <textarea id="claim" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ví dụ: Một nhận định, đoạn trích, tiêu đề bài viết hoặc nội dung bạn đang băn khoăn…" maxLength={12000} />
        <div className={styles.formFoot}>
          <span>{prompt.length.toLocaleString("vi-VN")} / 12.000 ký tự</span>
          <button type="submit" disabled={loading}>{loading ? "Đang đối chiếu…" : "Phân tích thông tin"}<Search size={17} /></button>
        </div>
        {error && <p className={styles.error} role="alert"><AlertTriangle size={16} />{error}</p>}
      </form>
      {loading && <div className={styles.loading} aria-live="polite"><span /><span /><span /> Đang tách luận điểm và tìm hướng đối chiếu…</div>}
      {analysis && <article className={styles.result} aria-live="polite">
        <header className={styles.resultHead}><p>KẾT QUẢ PHÂN TÍCH</p><span className={styles.verdict}>{analysis.verdict}</span></header>
        <p className={styles.summary}>{analysis.summary}</p>
        <div className={styles.columns}>
          <section><h3><ShieldQuestion size={18} />Các luận điểm cần kiểm</h3><ol>{analysis.claims.map((item, index) => <li key={`${item.claim}-${index}`}><strong>{item.claim}</strong><p>{item.assessment}</p><small>Độ chắc chắn: {item.confidence}</small></li>)}</ol></section>
          <section><h3><AlertTriangle size={18} />Điểm cần thận trọng</h3><ul>{analysis.cautions.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul><h3 className={styles.searchTitle}><Search size={18} />Gợi ý truy vấn nguồn</h3><ul className={styles.queries}>{analysis.searchQueries.map((item, index) => <li key={`${item}-${index}`}><a href={googleSearchUrl(item)} target="_blank" rel="noreferrer">{item}</a></li>)}</ul></section>
        </div>
        {analysis.sources.length > 0 && <section className={styles.sources}><h3>Nguồn nên đối chiếu</h3>{analysis.sources.map((source, index) => <a key={`${source.url}-${index}`} href={source.url} target="_blank" rel="noreferrer"><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{source.title}</strong><p>{source.reason}</p></div><ArrowUpRight size={18} /></a>)}</section>}
        <p className={styles.reminder}><Check size={17} />{analysis.reminder}</p>
      </article>}
    </section>
  );
}
