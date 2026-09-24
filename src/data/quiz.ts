import type { QuizQuestion } from "./types";
export const quiz: QuizQuestion[] = [
  {
    id: "nguon",
    question: "Khi sử dụng một trích dẫn, thông tin nào cần được kiểm tra?",
    choices: [
      "Chỉ cần tên người được trích dẫn",
      "Văn bản gốc, bối cảnh và nguồn dẫn",
      "Số lượt chia sẻ trên mạng",
    ],
    correctAnswer: 1,
    explanation:
      "Đối chiếu văn bản gốc và bối cảnh giúp tránh trích sai, cắt nghĩa sai hoặc gán nhầm tác giả.",
  },
  {
    id: "anh",
    question:
      "Một bức ảnh minh họa có thể được dùng như bằng chứng lịch sử không?",
    choices: [
      "Có, nếu trông giống ảnh cũ",
      "Có, nếu hình ảnh đẹp",
      "Không; cần xác định xuất xứ và tính chất của ảnh",
    ],
    correctAnswer: 2,
    explanation:
      "Ảnh minh họa giúp trình bày ý tưởng nhưng không thay thế tư liệu có xuất xứ được kiểm chứng.",
  },
  {
    id: "boi-canh",
    question: "Vì sao cần đặt một văn bản trong bối cảnh ra đời?",
    choices: [
      "Để hiểu rõ đối tượng, mục đích và vấn đề được đề cập",
      "Để không cần đọc toàn văn",
      "Để chỉ ghi nhớ ngày tháng",
    ],
    correctAnswer: 0,
    explanation:
      "Bối cảnh hỗ trợ việc đọc và phân tích văn bản, giúp hiểu đúng hơn các câu hỏi mà văn bản hướng đến.",
  },
];
