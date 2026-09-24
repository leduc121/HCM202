import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site, conversation } from "@/src/data/site";

export function Hero() {
  return (
    <section className="hero dark" id="khoi-dau">
      <div className="hero-top">
        <span className="meta">01 / LỜI GIỚI THIỆU</span>
        <span className="meta">{site.year} · NGUỒN TƯ LIỆU</span>
      </div>
      <div className="hero-copy">
        <h1 className="hero-title">
          {site.titleLines.map((line) => (
            <span className="title-mask" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <div className="hero-deck">
          <p className="hero-subtitle">
            {site.subtitleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <p className="hero-description">{site.description}</p>
        </div>
        <a className="hero-cta" href="#loi-mo-dau">
          Bắt đầu hành trình
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="hero-bottom">
        <a href={conversation.sourceUrl} target="_blank" rel="noreferrer">
          <span>VIDEO NỀN / TƯ LIỆU</span>
          <span>
            {conversation.caption}
            <ArrowUpRight size={12} />
          </span>
        </a>
        <a href="#loi-mo-dau" className="scroll-cue">
          CUỘN ĐỂ KHÁM PHÁ
          <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}
