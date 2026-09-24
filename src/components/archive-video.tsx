import { assetUrl, conversation } from "@/src/data/site";

/**
 * One persistent video surface for the entire exhibition. The loop is edited
 * from verified historical photographs listed in public/images/ASSETS.md; it
 * is not presented as original moving-image footage.
 */
export function ArchiveVideo() {
  return (
    <div className="archive-video" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={conversation.src}
      >
        <source src={assetUrl("/videos/ho-chi-minh-archive.mp4")} type="video/mp4" />
      </video>
      <div className="archive-video-wash" />
    </div>
  );
}
