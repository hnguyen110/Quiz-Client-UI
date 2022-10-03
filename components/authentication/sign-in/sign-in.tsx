import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import SignInParameters from "../../../utilities/parameters/authentication/sign-in.parameters";

export default function SignIn() {
  async function onFinishHandler(data: SignInParameters) {
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      message.error(
        "There was a an issue during the sign-in process, please try again"
      );
    } else {
      message.success("The sign-in process is successful");
    }
  }

  return (
    <Row className="pt-12 px-4">
      <Col className="m-auto" xs={24} sm={24} md={15} lg={9} xl={9}>
        <Typography.Title level={3}>Sign In</Typography.Title>
        <Form onFinish={onFinishHandler} layout="vertical">
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

          <Form.Item>
            <Button
              onClick={() => signOut()}
              block
              danger
              type="primary"
              htmlType="submit"
            >
              Sign Out
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
