import Image from "next/image";
import { Hero } from "@/src/components/hero";
import { ArrowUp, ArrowUpRight, BookOpen } from "lucide-react";
import { site, meeting, readingTable } from "@/src/data/site";
import { quotes } from "@/src/data/quotes";
import { references } from "@/src/data/references";
import { team } from "@/src/data/team";
import { Navigation } from "@/src/components/navigation";
import { ExhibitionMotion } from "@/src/components/motion";
import { ArchiveFigure, SectionLabel } from "@/src/components/shared";
import { Foundations } from "@/src/components/foundations";
import { Timeline } from "@/src/components/timeline";
import { Chapters } from "@/src/components/chapters";
import { Gallery } from "@/src/components/gallery";
import { Concepts } from "@/src/components/concepts";
import { Quiz } from "@/src/components/quiz";
import { ArchiveVideo } from "@/src/components/archive-video";

export default function Home() {
  return (
    <>
      <ArchiveVideo />
      <Navigation />
      <ExhibitionMotion />
      <main id="noi-dung">
        {/* 1. FULL-PHOTO HERO */}
        <Hero />

        {/* NOTICE BAR */}
        <aside className="content-notice">
          <BookOpen size={16} />
          <p>{site.notice}</p>
        </aside>

        {/* 2. LIGHT EDITORIAL INTRODUCTION */}
        <section id="loi-mo-dau" className="section introduction">
          <SectionLabel number="01">{site.intro.label}</SectionLabel>
          <div className="intro-document">
            <div className="intro-document-image">
              <Image
                src={meeting.src}
                alt={meeting.alt}
                fill
                sizes="(max-width:767px) 100vw, 65vw"
              />
            </div>
            <div className="intro-statement">
              <h2 data-reveal>{site.intro.title}</h2>
              <p>{site.intro.question}</p>
              <a className="hero-cta" href="#ket-noi">
                Khám phá các ý niệm
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="intro-foot">
            <a href={meeting.sourceUrl} target="_blank" rel="noreferrer">
              {meeting.caption}
              <br />
              {meeting.date} / Nguồn ảnh ↗
            </a>
            <div>
              <p>{site.intro.body}</p>
              <small>{site.intro.note}</small>
            </div>
          </div>
        </section>

        {/* 3. DARK IMAGE-DRIVEN CORE IDEAS */}
        <Concepts />

        {/* 4. CINEMATIC TIMELINE */}
        <Timeline />

        {/* 5. QUIET LARGE QUOTE */}
        <section className="dark quote-section">
          <SectionLabel number="05">Một khoảng suy ngẫm</SectionLabel>
          {quotes.map((quote) => (
            <figure key={quote.id}>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote className="quote-lines">
                {quote.lines?.map((line) => (
                  <span className="quote-mask" key={line}>
                    <span className="quote-line">{line}</span>
                  </span>
                )) ?? quote.quote}
              </blockquote>
              <figcaption>
                <span>
                  {quote.attribution}
                  {quote.year && ` / ${quote.year}`}
                </span>
                <p>{quote.context}</p>
                <small>{quote.source}</small>
              </figcaption>
            </figure>
          ))}
        </section>

        {/* 6. LIGHT LONG-FORM EDITORIAL */}
        <Foundations />

        {/* CHAPTER SEPARATOR */}
        <section className="chapter-separator dark">
          <div className="separator-inner">
            <span className="meta">{site.separator.label}</span>
            <span className="separator-number" aria-hidden="true">
              {site.separator.number}
            </span>
            <h2 data-reveal>{site.separator.title}</h2>
          </div>
        </section>

        <Chapters />

        <section className="story-section">
          <div className="section">
            <SectionLabel number="06">{site.story.label}</SectionLabel>
            <div className="story-grid">
              <ArchiveFigure image={readingTable} />
              <article>
                <h2 data-reveal>{site.story.title}</h2>
                <p className="story-lead">{site.story.body}</p>
                {site.story.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <dl className="story-metadata">
                  <div>
                    <dt>THỜI GIAN</dt>
                    <dd>{site.story.date}</dd>
                  </div>
                  <div>
                    <dt>ĐỊA ĐIỂM</dt>
                    <dd>{site.story.location}</dd>
                  </div>
                </dl>
                <small>{site.story.source}</small>
              </article>
            </div>
          </div>
        </section>

        {/* 7. DARK ARCHIVE GRID */}
        <Gallery />

        {/* 8. INTERACTIVE KNOWLEDGE / QUIZ */}
        <Quiz />

        {/* REFERENCES & TEAM */}
        <section id="tai-lieu" className="section references">
          <SectionLabel number="10">Tài liệu tham khảo</SectionLabel>
          <div className="reference-heading">
            <h2 data-reveal>{site.references.title}</h2>
            <p className="section-description">{site.references.description}</p>
          </div>
          <ol className="reference-list">
            {references.map((reference, i) => (
              <li id={`nguon-${reference.id}`} key={reference.id}>
                <span className="mono">[{String(i + 1).padStart(2, "0")}]</span>
                <div>
                  <span className="meta">{reference.type}</span>
                  <h3>{reference.title}</h3>
                  <p>
                    {reference.author} · {reference.publisher}
                  </p>
                  <small>{reference.year}</small>
                </div>
                {reference.url && (
                  <a
                    href={reference.url}
                    aria-label={`Mở nguồn: ${reference.title}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ArrowUpRight />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section id="nhom" className="section team-section">
          <SectionLabel number="11">Ghi nhận đóng góp</SectionLabel>
          <h2>{site.team.title}</h2>
          <p className="section-description">{site.team.description}</p>
          <div className="team-list">
            {team.map((member) => (
              <article key={member.id}>
                <span className="meta">{member.role}</span>
                <div>
                  <h3>{member.name}</h3>
                  <small>{member.studentId}</small>
                  <a className="team-email" href={`mailto:${member.email}`}>
                    {member.email}
                  </a>
                </div>
                <p>{member.contribution}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 9. CINEMATIC ENDING */}
        <section className="closing dark">
          <div className="section">
            <span className="meta">{site.closing.note}</span>
            <h2 data-reveal>{site.closing.title}</h2>
            <p>{site.closing.body}</p>
            <a href="#khoi-dau" className="return-top">
              Trở về khởi đầu
              <ArrowUp size={24} />
            </a>
          </div>
        </section>
      </main>

      {/* 10. MINIMAL CREDITS FOOTER */}
      <footer>
        <a href="#khoi-dau">{site.title}</a>
        <span>
          {site.course} / {site.university}
        </span>
        <div>
          <a href="#tai-lieu">Tài liệu</a>
          <a href="#nhom">Nhóm thực hiện</a>
          <span>© {site.year}</span>
        </div>
      </footer>
    </>
  );
}
