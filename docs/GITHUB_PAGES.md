# Triển khai GitHub Pages

Website được xuất tĩnh qua GitHub Actions mỗi khi có thay đổi trên nhánh `main`.

Trang kiểm chứng hoạt động trên GitHub Pages, nhưng công cụ `/advisor` cần một API bên ngoài vì GitHub Pages không chạy Node.js route handlers. Để kích hoạt công cụ này, đặt biến repository `NEXT_PUBLIC_ADVISOR_API_URL` trỏ tới endpoint backend HTTPS tương thích. Backend phải giữ kín `GEMINI_API_KEY` và gọi Gemini với công cụ `google_search`; giao diện sẽ hiển thị các nguồn grounding trả về từ Gemini.

Mã route handler ban đầu được lưu tại `docs/advisor-api-route.ts` để triển khai trên một nền tảng có hỗ trợ Node.js.
