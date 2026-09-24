import type { ArchiveImage, Foundation } from "./types";

export const assetUrl = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
export const portrait: ArchiveImage = {
  src: assetUrl("/images/hero/ho-chi-minh.jpg"),
  alt: "Chân dung đen trắng của Hồ Chí Minh",
  caption: "Chân dung Hồ Chí Minh",
  date: "Khoảng 1947, theo mô tả nguồn",
  source: "Wikimedia Commons · Tác giả chưa rõ",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_-_1946_Portrait.jpg",
};
export const readingTable: ArchiveImage = {
  src: assetUrl("/images/archive/reading-table.webp"),
  alt: "Minh họa bàn đọc với sách, giấy và bút máy",
  caption: "Không gian đọc và nghiên cứu",
  date: "Minh họa đương đại",
  source: "Ảnh minh họa tạo bằng AI, không phải tư liệu lịch sử",
  illustrative: true,
};
export const conversation: ArchiveImage = {
  src: assetUrl("/images/hero/france-1946.webp"),
  alt: "Hồ Chí Minh trò chuyện với kiều bào tại Pháp, năm 1946",
  caption: "Hồ Chí Minh cùng kiều bào tại Pháp",
  date: "1946 · Theo mô tả nguồn",
  source: "Tác giả chưa rõ / Wikimedia Commons / PD-Vietnam, PD-1996",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_with_Vietnamese_expats_in_France,_1946.jpg",
};
export const meeting: ArchiveImage = {
  src: assetUrl("/images/archive/meeting-1946.webp"),
  alt: "Hồ Chí Minh cùng Leclerc và Sainteny trong một cuộc gặp năm 1946",
  caption: "Hồ Chí Minh, Leclerc và Sainteny",
  date: "18.03.1946 · Theo mô tả nguồn",
  source:
    "Service Cinématographique des Armées / Wikimedia Commons / PD-France; bản quét Loc Vu-Quoc",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:1946_Ho_Chi_Minh_Leclerc_Sainteny_2.png",
};
export const ossTeam: ArchiveImage = {
  src: assetUrl("/images/timeline/oss-team-1945.jpg"),
  alt: "Hồ Chí Minh đứng cùng các thành viên OSS Deer Team năm 1945",
  caption: "Hồ Chí Minh cùng OSS Deer Team",
  date: "1945",
  source: "U.S. Army / Wikimedia Commons / Public domain",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_(third_from_left_standing)_and_the_OSS_in_1945.jpg",
};
export const baDinh1945: ArchiveImage = {
  src: assetUrl("/images/timeline/ba-dinh-1945.jpg"),
  alt: "Quảng trường Ba Đình trong ngày 2 tháng 9 năm 1945",
  caption: "Quảng trường Ba Đình, ngày 2 tháng 9 năm 1945",
  date: "02.09.1945",
  source: "Wikimedia Commons / Public domain theo trang nguồn",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Ba_Dinh_Square_September_2nd,_1945.jpg",
};
export const hoGiap1945: ArchiveImage = {
  src: assetUrl("/images/timeline/ho-giap-1945.jpg"),
  alt: "Hồ Chí Minh và Võ Nguyên Giáp năm 1945",
  caption: "Hồ Chí Minh và Võ Nguyên Giáp",
  date: "02.09.1945",
  source: "Võ An Ninh / Wikimedia Commons / PD-Vietnam, PD-1996",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_and_Vo_Nguyen_Giap_(1945).jpg",
};
export const ossBacBo1945: ArchiveImage = {
  src: assetUrl("/images/timeline/oss-bac-bo-1945.png"),
  alt: "Hồ Chí Minh cùng OSS Deer Team tại Bắc Bộ Phủ năm 1945",
  caption: "Hồ Chí Minh cùng OSS Deer Team tại Bắc Bộ Phủ",
  date: "09.1945",
  source: "Wikimedia Commons / Public domain theo trang nguồn",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_and_OSS_Deer_Team,_Bac_Bo_Palace,_1945_Sep.png",
};
export const ossFarewell1945: ArchiveImage = {
  src: assetUrl("/images/timeline/oss-farewell-1945.png"),
  alt: "Hồ Chí Minh và Võ Nguyên Giáp tiễn đoàn OSS năm 1945",
  caption: "Cuộc tiễn biệt đoàn OSS",
  date: "1945",
  source: "Wikimedia Commons / Public domain theo trang nguồn",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh,_Giap,_farewell_to_OSS_team_1945.png",
};
export const baoDai1945: ArchiveImage = {
  src: assetUrl("/images/timeline/bao-dai-1945.jpg"),
  alt: "Bảo Đại và Hồ Chí Minh năm 1945",
  caption: "Bảo Đại và Hồ Chí Minh",
  date: "1945",
  source: "Wikimedia Commons / Public domain theo trang nguồn",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Bao_Dai_and_Ho_Chi_Minh.jpg",
};
export const letter1945: ArchiveImage = {
  src: assetUrl("/images/documents/letter-1945.jpg"),
  alt: "Trang thư của Hồ Chí Minh gửi Ngoại trưởng Hoa Kỳ tháng 10 năm 1945",
  caption: "Thư gửi Ngoại trưởng Hoa Kỳ",
  date: "22.10.1945",
  source: "Wikimedia Commons / Public domain theo trang nguồn",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:1945_Oct_22_Ho_Chi_Minh_letter_to_US_Secretary_of_State_p2.jpg",
};
export const site = {
  title: "Tư tưởng Hồ Chí Minh",
  titleLines: ["TƯ TƯỞNG", "HỒ CHÍ MINH"],
  subtitle: "Một hành trình của tư tưởng",
  subtitleLines: ["Một hành trình", "của tư tưởng"],
  separator: {
    number: "02",
    title: "Từ những mạch nguồn đến một hệ thống tư tưởng.",
    label: "Chuyển chương",
  },
  description:
    "Một không gian để tìm hiểu, kết nối và suy ngẫm về tư tưởng Hồ Chí Minh.",
  course: "HCM202",
  university: "[Tên trường đại học]",
  group: "Group 1",
  semester: "[Học kỳ / Năm học]",
  year: "2026",
  notice:
    "Bản trưng bày thử nghiệm. Nội dung học thuật đang được biên soạn và đối chiếu nguồn.",
  navigation: [
    { label: "Khởi đầu", href: "#khoi-dau" },
    { label: "Dòng thời gian", href: "#dong-thoi-gian" },
    { label: "Tư tưởng", href: "#tu-tuong" },
    { label: "Tư liệu", href: "#tu-lieu" },
    { label: "Kiểm tra", href: "#kiem-tra" },
    { label: "Kiểm chứng", href: assetUrl("/advisor") },
    { label: "Tài liệu", href: "#tai-lieu" },
  ],
  intro: {
    label: "Lời mở đầu",
    title: "Tư tưởng không hình thành trong khoảng trống.",
    question: "Tư tưởng Hồ Chí Minh được hình thành như thế nào?",
    body: "Từ những giá trị của dân tộc đến những cuộc gặp gỡ với thế giới, từ trải nghiệm thực tiễn đến suy ngẫm lý luận. Hành trình này gợi mở một cách tiếp cận: đặt tư tưởng trong bối cảnh của con người và thời đại.",
    note: "Lời dẫn minh họa. Nội dung sẽ được hoàn thiện theo giáo trình môn học.",
  },
  origins: {
    title: "Những mạch nguồn tư tưởng",
    description: "Chọn một mạch nguồn để mở đầu cuộc tìm hiểu.",
  },
  timeline: {
    title: "Theo dấu một hành trình",
    description:
      "Cuộn qua những mốc thời gian. Dừng lại để đọc những câu hỏi của mỗi thời kỳ.",
    note: "Các mốc dưới đây là dữ liệu trình diễn; diễn giải và tư liệu sẽ được bổ sung sau khi đối chiếu giáo trình.",
  },
  chapters: {
    title: "Những tư tưởng. Những góc nhìn.",
    description:
      "Bốn chủ đề, nhiều cách tiếp cận. Mở từng chương để đọc đề cương nghiên cứu.",
  },
  story: {
    label: "Góc đọc sâu",
    title: "Đọc một văn bản. Hiểu một bối cảnh.",
    body: "Một tư liệu không chỉ mang trong mình những câu chữ. Thời điểm ra đời, người đọc hướng tới và những câu hỏi của thời đại đều là những chìa khóa để tiếp cận.",
    paragraphs: [
      "Ở đây, nhóm sẽ lựa chọn một văn bản tiêu biểu để giới thiệu bối cảnh, phân tích nội dung và kết nối với các luận điểm trong giáo trình.",
      "Phần trưng bày mẫu này dành chỗ cho bản chụp văn bản, chú giải thuật ngữ và dẫn nguồn đến từng trang. Hình bên cạnh chỉ minh họa không gian nghiên cứu.",
    ],
    date: "[Ngày tháng của tư liệu]",
    location: "[Địa điểm]",
    source: "[Văn bản và số trang sẽ được bổ sung]",
  },
  archive: {
    title: "Tư liệu lịch sử",
    description:
      "Dừng lại trước một bức ảnh, một trang sách. Mỗi tư liệu là một điểm khởi đầu cho câu hỏi mới.",
    empty: "Chưa có tư liệu trong nhóm này.",
  },
  concepts: {
    title: "Nhìn thấy những kết nối",
    description:
      "Một góc nhìn tổng thể qua các khái niệm. Chọn một ý niệm để đọc gợi ý nghiên cứu.",
  },
  quiz: {
    title: "Bạn đã hiểu hành trình này đến đâu?",
    description:
      "Ba câu hỏi thử nghiệm về phương pháp tìm hiểu tư liệu. Bộ câu hỏi học thuật sẽ được bổ sung sau.",
    complete: "Một điểm dừng để nhìn lại.",
    result: "Kết quả tìm hiểu",
    restart: "Thử lại",
    next: "Câu tiếp theo",
    finish: "Xem kết quả",
  },
  references: {
    title: "Đọc từ nguồn",
    description:
      "Danh mục dành cho giáo trình, tác phẩm và nguồn tư liệu. Các mục trong ngoặc vuông đang chờ bổ sung.",
  },
  team: {
    title: "Những người thực hiện",
    description: "Một công trình học tập và trao đổi cùng nhau.",
  },
  closing: {
    title: "Hành trình không dừng ở trang cuối.",
    body: "Không chỉ là lịch sử. Đó là một hệ thống tư tưởng tiếp tục được nghiên cứu và nhìn nhận trong hiện tại.",
    note: "Lời kết minh họa",
  },
};
export const foundations: Foundation[] = [
  {
    id: "dan-toc",
    title: "Truyền thống dân tộc Việt Nam",
    summary:
      "Tìm hiểu những giá trị văn hóa, tinh thần cộng đồng và truyền thống yêu nước trong quá trình hình thành tư tưởng.",
    note: "Đề cương minh họa · Chờ nội dung và nguồn học thuật",
    image: baDinh1945,
  },
  {
    id: "nhan-loai",
    title: "Tinh hoa văn hóa nhân loại",
    summary:
      "Gợi mở việc nghiên cứu sự tiếp nhận, chọn lọc và đối thoại với các giá trị văn hóa từ nhiều nền văn minh.",
    note: "Đề cương minh họa · Chờ nội dung và nguồn học thuật",
    image: letter1945,
  },
  {
    id: "ly-luan",
    title: "Chủ nghĩa Mác – Lênin",
    summary:
      "Dành cho phân tích cơ sở lý luận và mối liên hệ với thực tiễn Việt Nam theo nội dung giáo trình.",
    note: "Đề cương minh họa · Chờ nội dung và nguồn học thuật",
    image: ossTeam,
  },
  {
    id: "thuc-tien",
    title: "Phẩm chất và hoạt động thực tiễn",
    summary:
      "Đặt câu hỏi về vai trò của trải nghiệm, năng lực tự học và hoạt động thực tiễn trong quá trình hình thành tư tưởng.",
    note: "Đề cương minh họa · Chờ nội dung và nguồn học thuật",
    image: portrait,
  },
];
