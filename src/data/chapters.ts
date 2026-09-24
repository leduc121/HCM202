import type { Chapter } from "./types";
import { baDinh1945, baoDai1945, letter1945, portrait } from "./site";
export const chapters: Chapter[] = [
  {
    id: "doc-lap",
    number: "01",
    image: baDinh1945,
    title: "Độc lập dân tộc và chủ nghĩa xã hội",
    summary: "Khát vọng độc lập và con đường phát triển của dân tộc.",
    paragraphs: [
      "Đề cương minh họa: làm rõ các khái niệm cơ bản, bối cảnh hình thành và mối quan hệ giữa độc lập dân tộc với chủ nghĩa xã hội.",
      "Nội dung phân tích, ví dụ và trích dẫn theo trang sẽ được bổ sung từ giáo trình đã được giảng viên xác nhận.",
    ],
    referenceIds: ["giao-trinh"],
  },
  {
    id: "nha-nuoc",
    number: "02",
    image: baoDai1945,
    title: "Đảng Cộng sản Việt Nam và Nhà nước",
    summary: "Tổ chức, trách nhiệm và mối quan hệ với nhân dân.",
    paragraphs: [
      "Đề cương minh họa: nghiên cứu những nội dung về Đảng và Nhà nước trong hệ thống tư tưởng Hồ Chí Minh.",
      "Phần này chờ luận điểm, trích dẫn và câu hỏi thảo luận từ nội dung môn học.",
    ],
    referenceIds: ["giao-trinh"],
  },
  {
    id: "doan-ket",
    number: "03",
    image: portrait,
    title: "Đại đoàn kết dân tộc",
    summary: "Những mối liên hệ làm nên sức mạnh cộng đồng.",
    paragraphs: [
      "Đề cương minh họa: tìm hiểu khái niệm, vai trò và những nội dung của đại đoàn kết dân tộc.",
      "Các ví dụ thực tiễn và nguồn dẫn sẽ được nhóm biên soạn, đối chiếu trước khi công bố.",
    ],
    referenceIds: ["giao-trinh"],
  },
  {
    id: "con-nguoi",
    number: "04",
    image: letter1945,
    title: "Văn hóa, đạo đức và con người",
    summary: "Từ những giá trị chung đến cách sống mỗi ngày.",
    paragraphs: [
      "Đề cương minh họa: phân tích mối quan hệ giữa văn hóa, đạo đức và việc xây dựng con người.",
      "Phần liên hệ sẽ dành cho những câu hỏi thảo luận trong đời sống học tập hôm nay.",
    ],
    referenceIds: ["giao-trinh"],
  },
];
