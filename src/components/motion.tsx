"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ExhibitionMotion() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".hero-title .title-mask span",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.65, stagger: 0.1, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-deck, .hero-cta, .hero-top, .hero-bottom",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power2.out" },
      );

      gsap.to(".hero-copy", { y: -50, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => gsap.from(el, { clipPath: "inset(100% 0 0 0)", y: 25, duration: .85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".intro-document-image, .story-grid .figure-image, .chapter-media, .gallery-image").forEach((el) => {
        gsap.from(el, { clipPath: "inset(100% 0 0 0)", duration: .95, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        const img = el.querySelector("img");
        if (img) gsap.from(img, { scale: 1.12, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      gsap.from(".quote-line", { yPercent: 105, opacity: 0, stagger: .12, duration: .85, ease: "power3.out", scrollTrigger: { trigger: ".quote-section", start: "top 65%", once: true } });
      gsap.from(".core-story.featured", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".core-ideas-editorial", start: "top 78%", once: true },
      });
      gsap.from(".core-story.secondary", {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".core-stories-grid", start: "top 82%", once: true },
      });
      gsap.to(".separator-number", { y: -90, ease: "none", scrollTrigger: { trigger: ".chapter-separator", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".reading-progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: true } });

      // Images and local fonts can change section heights after the initial
      // measurement. Refresh once they settle so every reveal has a correct
      // scroll position.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      void document.fonts.ready.then(refresh);
      requestAnimationFrame(refresh);
      return () => window.removeEventListener("load", refresh);
    });
    const refreshLayout = (event: Event) => { if (event.target instanceof HTMLDetailsElement) ScrollTrigger.refresh(); };
    document.addEventListener("toggle", refreshLayout, true);
    return () => { document.removeEventListener("toggle", refreshLayout, true); media.revert(); };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: MouseEvent) => gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: .15, ease: "power2.out" });
    const enter = () => cursor.classList.add("active"); const leave = () => cursor.classList.remove("active");
    const targets = document.querySelectorAll(".gallery-item, .archive-figure, .chapter-media, .timeline-image");
    window.addEventListener("mousemove", move); targets.forEach((target) => { target.addEventListener("mouseenter", enter); target.addEventListener("mouseleave", leave); });
    return () => { window.removeEventListener("mousemove", move); targets.forEach((target) => { target.removeEventListener("mouseenter", enter); target.removeEventListener("mouseleave", leave); }); };
  }, []);

  return <>
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">XEM ↗</div>
  </>;
}
