import { Col, Row } from "antd";
import { useRouter } from "next/router";
import Sidebar from "../sidebar/sidebar";

interface Props {
  children: any;
}

export default function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <Row>
      <Col xs={0} sm={0} md={6}>
        <Sidebar />
      </Col>
      <Col xs={24} sm={24} md={18}>
        <main className="w-full">{children}</main>
      </Col>
    </Row>
  );
}
