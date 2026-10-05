# Triển khai GitHub Pages

Website được xuất tĩnh qua GitHub Actions mỗi khi có thay đổi trên nhánh `main`.

Trang triển lãm hoạt động trên GitHub Pages. Công cụ `/advisor` cần một API bên ngoài vì GitHub Pages không chạy Node.js route handlers. Để kích hoạt công cụ này, đặt biến repository `NEXT_PUBLIC_ADVISOR_API_URL` trỏ tới endpoint backend HTTPS tương thích.

Mã route handler ban đầu được lưu tại `docs/advisor-api-route.ts` để triển khai trên một nền tảng có hỗ trợ Node.js.
