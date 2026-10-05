import type { Metadata } from "next";
import Link from "next/link";
import { AdvisorTool } from "@/src/components/advisor-tool";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kiểm chứng thông tin | Tư tưởng Hồ Chí Minh",
  description: "Công cụ hỗ trợ đọc, kiểm chứng nguồn và tư duy phản biện.",
};

export default function AdvisorPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/">
          <span>Tư tưởng</span>
          <span>Hồ Chí Minh.</span>
        </Link>
        <Link className={styles.back} href="/">
          ← Trở về triển lãm
        </Link>
      </header>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>CÔNG CỤ HỖ TRỢ HỌC TẬP / 01</p>
        <h1>Đọc chậm.<br />Kiểm tra kỹ.</h1>
        <p>
          Dán một nhận định, đoạn trích hoặc đường dẫn để nhận khung phân tích:
          điều gì cần bằng chứng, nên tìm ở đâu và cần thận trọng chỗ nào.
        </p>
      </section>
      <AdvisorTool />
    </main>
  );
}
