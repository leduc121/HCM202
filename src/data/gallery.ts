import type { GalleryItem } from "./types";
import { baDinh1945, hoGiap1945, ossBacBo1945, ossFarewell1945 } from "./site";
export const gallery: GalleryItem[] = [
  {
    id: "kieu-bao",
    title: "Quảng trường Ba Đình",
    year: "1945",
    type: "Ảnh tư liệu",
    image: baDinh1945,
    caption:
      "Quảng trường Ba Đình trong ngày 2 tháng 9 năm 1945, theo mô tả tại trang nguồn Wikimedia Commons.",
    source: baDinh1945.source,
  },
  {
    id: "cuoc-gap",
    title: "Hồ Chí Minh và Võ Nguyên Giáp",
    year: "1945",
    type: "Ảnh tư liệu",
    image: hoGiap1945,
    caption:
      "Ảnh Hồ Chí Minh và Võ Nguyên Giáp, ngày 2 tháng 9 năm 1945, theo mô tả tại trang nguồn.",
    source: hoGiap1945.source,
  },
  {
    id: "chan-dung",
    title: "Cuộc gặp tại Bắc Bộ Phủ",
    year: "1945",
    type: "Ảnh tư liệu",
    image: ossBacBo1945,
    caption:
      "Hồ Chí Minh cùng OSS Deer Team tại Bắc Bộ Phủ, tháng 9 năm 1945, theo mô tả tại trang nguồn.",
    source: ossBacBo1945.source,
  },
  {
    id: "ban-doc",
    title: "Cuộc tiễn biệt đoàn OSS",
    year: "1945",
    type: "Ảnh tư liệu",
    image: ossFarewell1945,
    caption:
      "Hồ Chí Minh và Võ Nguyên Giáp trong cuộc tiễn biệt đoàn OSS năm 1945, theo mô tả tại trang nguồn.",
    source: ossFarewell1945.source,
  },
];
