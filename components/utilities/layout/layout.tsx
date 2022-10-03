import {Col, Row} from "antd";
import Sidebar from "../sidebar/sidebar";

interface Props {
    children: any;
}

export default function Layout({children}: Props) {
    return (
        <Row>
            <Col xs={0} sm={0} md={6}>
                <Sidebar/>
            </Col>
            <Col xs={24} sm={24} md={18}>
                <main className="w-full">{children}</main>
            </Col>
        </Row>
    );
}
