"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/src/data/site";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#khoi-dau");
  const [dark, setDark] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    site.navigation.forEach((item) => {
      if (!item.href.startsWith("#")) return;
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setDark(
              e.target.classList.contains("dark") && e.target.id !== "khoi-dau",
            );
        });
      },
      { rootMargin: "-80px 0px -85% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section, main > aside")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#noi-dung">
        Bỏ qua điều hướng
      </a>
      <header className={`navigation ${dark && !open ? "nav-dark" : ""}`}>
        <nav className="nav-shell" aria-label="Điều hướng chính">
          <div className="nav-cluster nav-cluster-left">
            {site.navigation.slice(0, 3).map((item) => (
              <a key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="#khoi-dau" className="wordmark">
            <span>Tư tưởng</span>
            <span>Hồ Chí Minh<span className="mark-period">.</span></span>
          </a>
          <div className="nav-cluster nav-cluster-right">
            {site.navigation.slice(3).map((item) => (
              <a key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined}>
                {item.label}
              </a>
            ))}
          </div>
          <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Đóng mục lục" : "Mở mục lục"} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
          <div id="main-navigation" className={open ? "nav-drawer is-open" : "nav-drawer"}>
            {site.navigation.map((item) => (
              <a key={item.href} href={item.href} aria-current={active === item.href ? "location" : undefined} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <div className="reading-progress" aria-hidden="true" />
    </>
  );
}
