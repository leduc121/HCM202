import type { Concept } from "./types";
import {
  conversation,
  hoGiap1945,
  meeting,
  ossFarewell1945,
  ossTeam,
} from "./site";

export const concepts: (Concept & { image?: typeof conversation })[] = [
  {
    id: "doc-lap",
    title: "Độc lập dân tộc",
    chapterId: "doc-lap",
    relationship: "Đặt trong mối quan hệ với con đường phát triển của dân tộc.",
    definition:
      "Nội dung minh họa: Quyền tự quyết, chủ quyền quốc gia và khát vọng tự do của dân tộc Việt Nam.",
    image: conversation,
  },
  {
    id: "xa-hoi",
    title: "Chủ nghĩa xã hội",
    chapterId: "doc-lap",
    relationship: "Gợi ý kết nối với độc lập dân tộc và mục tiêu phát triển.",
    definition:
      "Nội dung minh họa: Mục tiêu làm cho dân giàu, nước mạnh, xã hội công bằng, dân chủ, văn minh.",
    image: ossTeam,
  },
  {
    id: "doan-ket",
    title: "Đại đoàn kết dân tộc",
    chapterId: "doan-ket",
    relationship: "Gợi ý kết nối giữa cộng đồng, tổ chức và nhân dân.",
    definition:
      "Nội dung minh họa: Kết nối sức mạnh toàn dân tộc, mở rộng đoàn kết quốc tế.",
    image: ossFarewell1945,
  },
  {
    id: "van-hoa-dao-duc",
    title: "Văn hóa & Đạo đức",
    chapterId: "con-nguoi",
    relationship: "Gợi ý kết nối với đạo đức và sự phát triển con người.",
    definition:
      "Nội dung minh họa: Văn hóa soi đường cho quốc dân đi; đạo đức cách mạng Cần, Kiệm, Liêm, Chính.",
    image: hoGiap1945,
  },
  {
    id: "con-nguoi",
    title: "Con người",
    chapterId: "con-nguoi",
    relationship: "Gợi ý nhìn lại mối liên hệ giữa các chủ đề của triển lãm.",
    definition:
      "Nội dung minh họa: Con người vừa là mục tiêu, vừa là động lực của sự phát triển xã hội.",
    image: meeting,
  },
];
