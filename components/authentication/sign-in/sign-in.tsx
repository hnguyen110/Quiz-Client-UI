import { Button, Col, Form, Input, Row, Typography } from "antd";
import Link from "next/link";

export default function SignIn() {
  return (
    <Row className="pt-12 px-4">
      <Col className="m-auto" xs={24} sm={24} md={15} lg={9} xl={9}>
        <Typography.Title level={3}>Sign In</Typography.Title>
        <Form layout="vertical">
          <Form.Item
            hasFeedback
            label="Username"
            name="username"
            rules={[{ required: true, message: "This field can not be empty" }]}
          >
            <Input placeholder="Please enter your username" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Password"
            name="password"
            rules={[{ required: true, message: "This field can not be empty" }]}
          >
            <Input.Password placeholder="Please enter your password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>

          <Link href="/auth/sign-up">
            Do not have an account yet? Sign up here.
          </Link>
        </Form>
      </Col>
    </Row>
  );
}
