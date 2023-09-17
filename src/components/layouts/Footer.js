import { Col, Layout } from "antd";
import styles from "./Footer.module.css";

function Footer() {
  const { Footer: AntFooter } = Layout;
  const year = new Date().getFullYear();

  return (
    <AntFooter className={styles.footer}>
      <Col xs={24} md={24} lg={12} className={styles.copyrightCol}>
        <p className={styles.copyrightText}>
          {"@ "}{year}{" "}
          <a
              href="https://https://www.kemenkumham.go.id/"
              className="font-weight-bold"
              target="_blank"
              rel="noreferrer"
          >
            Kementrian Hukum Dan Hak Asasi Manusia
          </a>
        </p>
      </Col>
    </AntFooter>
  );
}

export default Footer;
