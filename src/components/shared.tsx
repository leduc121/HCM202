import Image from "next/image";
import type { ArchiveImage } from "@/src/data/types";
export function ArchiveFigure({
  image,
  priority = false,
  className = "",
}: {
  image: ArchiveImage;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`archive-figure ${className}`}>
      <div className="figure-image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 767px) 92vw, 50vw"
          preload={priority}
        />
      </div>
      <figcaption>
        <span>{image.caption}</span>
        <span>{image.illustrative ? "Minh họa AI" : image.date}</span>
      </figcaption>
    </figure>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}
