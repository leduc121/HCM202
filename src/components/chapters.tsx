import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { chapters } from "@/src/data/chapters";
import { site } from "@/src/data/site";
import { references } from "@/src/data/references";
import { SectionLabel } from "./shared";
export function Chapters() {
  return (
    <section id="tu-tuong" className="dark core-section">
      <div className="section chapters">
        <div className="media-heading">
          <div>
            <SectionLabel number="03">Các chủ đề cốt lõi</SectionLabel>
            <h2 data-reveal>{site.chapters.title}</h2>
          </div>
          <p>{site.chapters.description}</p>
          <a href="#dong-thoi-gian" className="outline-link">
            Theo dấu hành trình
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="chapter-list">
          {chapters.map((chapter) => (
            <details
              key={chapter.id}
              id={`chuong-${chapter.id}`}
              className="chapter"
            >
              <summary>
                {chapter.image && (
                  <div className="chapter-media">
                    <Image
                      src={chapter.image.src}
                      alt={chapter.image.alt}
                      fill
                      sizes="(max-width:767px) 90vw, 45vw"
                    />
                    <span className="media-action">
                      Khám phá chương
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                )}
                <span className="chapter-meta">
                  <span>CHƯƠNG {chapter.number}</span>
                  <span>
                    {chapter.image?.illustrative
                      ? "MINH HỌA AI"
                      : "ẢNH THAM CHIẾU"}
                  </span>
                </span>
                <div className="chapter-title-row">
                  <span className="chapter-number">{chapter.number}</span>
                  <h3>{chapter.title}</h3>
                  <ArrowDown size={19} />
                </div>
                <p>{chapter.summary}</p>
              </summary>
              <div className="chapter-body">
                <span className="meta">ĐỀ CƯƠNG MINH HỌA</span>
                {chapter.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {chapter.image && (
                  <p className="chapter-image-credit">
                    {chapter.image.caption} / {chapter.image.date}
                    {chapter.image.sourceUrl && (
                      <a
                        href={chapter.image.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        · Nguồn ảnh <ArrowUpRight size={12} />
                      </a>
                    )}
                  </p>
                )}
                {chapter.referenceIds.map((id) => (
                  <a className="text-link" key={id} href={`#nguon-${id}`}>
                    {references.find((r) => r.id === id)?.title ?? "Xem nguồn"}
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
