"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { timeline } from "@/src/data/timeline";
import { site } from "@/src/data/site";
import { SectionLabel, ArchiveFigure } from "./shared";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function Timeline() {
  const [selected, setSelected] = useState(0);
  const selectedRef = useRef(0);
  const wrapper = useRef<HTMLElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          pin.current = ScrollTrigger.create({
            trigger: wrapper.current,
            start: "top top",
            end: () => `+=${window.innerHeight * timeline.length * 0.6}`,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(
                timeline.length - 1,
                Math.floor(self.progress * timeline.length),
              );
              if (next !== selectedRef.current) {
                selectedRef.current = next;
                setSelected(next);
              }
            },
          });
          return () => {
            pin.current = null;
          };
        },
      );
      return () => media.revert();
    },
    { scope: wrapper },
  );
  function go(index: number) {
    selectedRef.current = index;
    setSelected(index);
    if (pin.current) {
      window.scrollTo({
        top:
          pin.current.start +
          ((index + 0.3) / timeline.length) *
            (pin.current.end - pin.current.start),
        behavior: "instant",
      });
    }
  }
  const item = timeline[selected];
  if (!item) return null;
  return (
    <section
      ref={wrapper}
      id="dong-thoi-gian"
      className="dark timeline-section"
    >
      <div className="timeline-shell">
        <div className="timeline-heading">
          <div>
            <SectionLabel number="04">Dòng thời gian</SectionLabel>
            <h2>{site.timeline.title}</h2>
          </div>
          <p>{site.timeline.description}</p>
        </div>
        <div className="timeline-desktop">
          <div className="year-index" aria-label="Chọn mốc thời gian">
            {timeline.map((event, i) => (
              <button
                key={event.id}
                onClick={() => go(i)}
                aria-pressed={i === selected}
                aria-controls="timeline-detail"
              >
                {event.year}
              </button>
            ))}
          </div>
          <div
            id="timeline-detail"
            className="timeline-stage"
            aria-live="polite"
          >
            <div className="timeline-year-column">
              <span className="meta">MỐC THỜI GIAN / MINH HỌA</span>
              <div className="giant-year" key={item.year}>
                {item.year}
              </div>
              <div className="timeline-controls">
                <button
                  aria-label="Mốc trước"
                  disabled={selected === 0}
                  onClick={() => go(selected - 1)}
                >
                  <ArrowLeft />
                </button>
                <span className="mono">
                  {String(selected + 1).padStart(2, "0")} /{" "}
                  {String(timeline.length).padStart(2, "0")}
                </span>
                <button
                  aria-label="Mốc tiếp theo"
                  disabled={selected === timeline.length - 1}
                  onClick={() => go(selected + 1)}
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div key={item.id} className="timeline-frame">
              {item.image && (
                <div className="timeline-image">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="55vw"
                    className={
                      item.image.src.includes("ho-chi-minh")
                        ? "portrait-image"
                        : undefined
                    }
                  />
                  <span className="timeline-image-label">
                    ẢNH THAM CHIẾU / {item.image.date}
                  </span>
                </div>
              )}
              <article className="timeline-copy">
                <h3>{item.title}</h3>
                <p className="location">
                  <MapPin size={12} />
                  {item.location}
                </p>
                <p>{item.description}</p>
                <small>{item.source}</small>
                {item.image?.sourceUrl && (
                  <a
                    className="timeline-source"
                    href={item.image.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Nguồn ảnh tham chiếu (không mô tả mốc {item.year})
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </article>
            </div>
          </div>
          <div className="timeline-bottom">
            <p>{site.timeline.note}</p>
            <span className="meta">
              CUỘN ĐỂ TIẾP TỤC <ArrowRight size={14} />
            </span>
          </div>
        </div>
        <div className="mobile-timeline">
          {timeline.map((event) => (
            <details key={event.id}>
              <summary>
                <span>{event.year}</span>
                <span>{event.title}</span>
                <ArrowRight size={20} />
              </summary>
              {event.image && <ArchiveFigure image={event.image} />}
              <p>{event.location}</p>
              <p>{event.description}</p>
              <small>{event.source}</small>
              <small>Ảnh tham chiếu, không mô tả mốc {event.year}.</small>
              {event.image?.sourceUrl && (
                <a
                  className="text-link"
                  href={event.image.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Nguồn ảnh
                  <ArrowUpRight size={12} />
                </a>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
