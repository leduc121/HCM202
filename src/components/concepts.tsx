"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { concepts } from "@/src/data/concepts";
import { site } from "@/src/data/site";
import { SectionLabel } from "./shared";

export function Concepts() {
  const [selected, setSelected] = useState(0);
  const featured = concepts[0];
  const secondary = concepts.slice(1);

  return (
    <section className="dark section concepts-section" id="ket-noi">
      <div className="section-inner">
        <SectionLabel number="08">Bản đồ tư tưởng</SectionLabel>
        <div className="concepts-header">
          <h2 data-reveal>{site.concepts.title}</h2>
          <p className="section-description">{site.concepts.description}</p>
        </div>

        <div className="core-ideas-editorial">
          {/* Main Featured Core Story */}
          <article
            className={`core-story featured ${selected === 0 ? "active" : ""}`}
            onClick={() => setSelected(0)}
          >
            <div className="core-image-wrap">
              {featured.image && (
                <Image
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 60vw"
                  className="core-image"
                />
              )}
              {!featured.image && <span className="core-placeholder">01</span>}
              <div className="core-image-overlay" />
              <span className="core-tag">01 / CHỦ ĐỀ TRỌNG TÂM</span>
            </div>
            <div className="core-story-content">
              <span className="mono">01</span>
              <h3>{featured.title}</h3>
              <p>{featured.definition}</p>
              <span className="core-relationship">{featured.relationship}</span>
              <a
                className="text-link"
                href={`#chuong-${featured.chapterId}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const chapter = document.getElementById(
                    `chuong-${featured.chapterId}`,
                  );
                  if (chapter instanceof HTMLDetailsElement) chapter.open = true;
                }}
              >
                Đọc chương liên quan <ArrowUpRight size={16} />
              </a>
            </div>
          </article>

          {/* Secondary Asymmetric Stories Grid */}
          <div className="core-stories-grid">
            {secondary.map((item, idx) => {
              const itemIndex = idx + 1;
              const isSelected = selected === itemIndex;
              return (
                <article
                  key={item.id}
                  className={`core-story secondary ${isSelected ? "active" : ""}`}
                  onClick={() => setSelected(itemIndex)}
                >
                  <div className="core-image-wrap-small">
                    {item.image && (
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 767px) 100vw, 25vw"
                        className="core-image"
                      />
                    )}
                    {!item.image && <span className="core-placeholder">0{itemIndex + 1}</span>}
                    <span className="core-tag">0{itemIndex + 1}</span>
                  </div>
                  <div className="core-small-content">
                    <span className="mono">0{itemIndex + 1}</span>
                    <h4>{item.title}</h4>
                    <p>{item.definition}</p>
                    <a
                      className="text-link"
                      href={`#chuong-${item.chapterId}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const chapter = document.getElementById(
                          `chuong-${item.chapterId}`,
                        );
                        if (chapter instanceof HTMLDetailsElement)
                          chapter.open = true;
                      }}
                    >
                      Đọc chương <ArrowUpRight size={14} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
