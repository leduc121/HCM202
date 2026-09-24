"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { foundations, site } from "@/src/data/site";
import { ArchiveFigure, SectionLabel } from "./shared";
export function Foundations() {
  const [selected, setSelected] = useState(0);
  const item = foundations[selected];
  return (
    <section id="mach-nguon" className="section foundations">
      <SectionLabel number="02">Cơ sở hình thành</SectionLabel>
      <h2 data-reveal>{site.origins.title}</h2>
      <div className="foundations-grid">
        <div>
          <p className="section-description">{site.origins.description}</p>
          <div className="foundation-list">
            {foundations.map((f, i) => (
              <button
                key={f.id}
                aria-pressed={selected === i}
                aria-controls="foundation-detail"
                onClick={() => setSelected(i)}
                className={selected === i ? "selected" : ""}
              >
                <span className="mono">0{i + 1}</span>
                <span>{f.title}</span>
                <ArrowUpRight size={22} />
              </button>
            ))}
          </div>
        </div>
        <div
          id="foundation-detail"
          className="foundation-detail"
          aria-live="polite"
        >
          <ArchiveFigure image={item.image} />
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <small>{item.note}</small>
        </div>
      </div>
    </section>
  );
}
