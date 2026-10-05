import type { Reference } from "./types";
import { portrait, conversation, meeting } from "./site";
export const references: Reference[] = [
  {
    id: "anh-phap",
    author: "Tác giả chưa rõ",
    title: "Ho Chi Minh with Vietnamese expats in France, 1946",
    publisher: "Wikimedia Commons / PD-Vietnam, PD-1996",
    year: "1946",
    url: conversation.sourceUrl,
    type: "Nguồn hình ảnh",
  },
  {
    id: "anh-doi-thoai",
    author: "Service Cinématographique des Armées",
    title: "1946 Ho Chi Minh Leclerc Sainteny 2",
    publisher: "Wikimedia Commons / PD-France; bản quét Loc Vu-Quoc",
    year: "1946",
    url: meeting.sourceUrl,
    type: "Nguồn hình ảnh",
  },
  {
    id: "giao-trinh",
    author: "Bộ Giáo dục và Đào tạo",
    title: "Giáo trình Tư tưởng Hồ Chí Minh dành cho bậc đại học không chuyên ngành lý luận chính trị",
    publisher: "Bộ Giáo dục và Đào tạo · Hà Nội",
    year: "2019 · Chương 6, tr. 127-142",
    type: "Giáo trình",
  },
  {
    id: "anh",
    author: "Tác giả chưa rõ",
    title: "Ho Chi Minh - 1946 Portrait.jpg",
    publisher: "Wikimedia Commons · Public Domain Mark",
    year: "Khoảng 1947 theo mô tả nguồn",
    url: portrait.sourceUrl,
    type: "Nguồn hình ảnh",
  },
];
