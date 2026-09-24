"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { gallery } from "@/src/data/gallery";
import type { GalleryItem } from "@/src/data/types";
import { site } from "@/src/data/site";
import { SectionLabel } from "./shared";
export function Gallery() {
  const [filter, setFilter] = useState("Tất cả");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const filtered = gallery.filter(
    (item) => filter === "Tất cả" || item.type === filter,
  );
  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    trigger.current?.focus();
  }
  return (
    <section className="dark gallery-section" id="tu-lieu">
      <div className="section">
        <SectionLabel number="07">Phòng tư liệu</SectionLabel>
        <h2 data-reveal>{site.archive.title}</h2>
        <p className="section-description">{site.archive.description}</p>
        <div className="gallery-filters" aria-label="Lọc loại tư liệu">
          {["Tất cả", ...new Set(gallery.map((item) => item.type))].map(
            (type) => (
              <button
                aria-pressed={filter === type}
                key={type}
                onClick={() => setFilter(type)}
              >
                {type}
                <span>
                  {type === "Tất cả"
                    ? gallery.length
                    : gallery.filter((item) => item.type === type).length}
                </span>
              </button>
            ),
          )}
        </div>
        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              className={`gallery-item gallery-item-${i}`}
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setSelected(item);
              }}
              aria-haspopup="dialog"
            >
              <div className="gallery-image">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width:767px) 90vw, 48vw"
                />
                <span className="inspect-icon">
                  Xem tư liệu <ArrowUpRight size={18} />
                </span>
              </div>
              <span className="gallery-meta">
                {item.type}
                <span>
                  {item.image.illustrative ? "Minh họa AI" : item.year}
                </span>
              </span>
              <span className="gallery-title">
                {item.title}
                <ArrowUpRight size={24} />
              </span>
              <span className="gallery-caption">{item.caption}</span>
            </button>
          ))}
        </div>
        {!filtered.length && <p>{site.archive.empty}</p>}
      </div>
      <dialog
        ref={dialog}
        className="inspection"
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="inspection-title"
      >
        {selected && (
          <div className="inspection-layout">
            <button
              className="close-dialog"
              autoFocus
              onClick={close}
              aria-label="Đóng tư liệu"
            >
              <X />
            </button>
            <div className="inspection-image">
              <Image
                src={selected.image.src}
                alt={selected.image.alt}
                fill
                sizes="(max-width:767px) 95vw, 65vw"
              />
            </div>
            <div className="inspection-copy">
              <span className="meta">{selected.type}</span>
              <h3 id="inspection-title">{selected.title}</h3>
              <p>{selected.year}</p>
              <p>{selected.caption}</p>
              <small>{selected.source}</small>
              {selected.image.sourceUrl && (
                <a
                  className="text-link"
                  href={selected.image.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Xem nguồn gốc <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
