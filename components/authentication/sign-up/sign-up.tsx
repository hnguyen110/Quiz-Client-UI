import validator from "validator";
import { Button, Col, Form, Input, Row, Typography } from "antd";

export default function SignUp() {
  return (
    <Row className="pt-12 px-4">
      <Col className="m-auto" xs={24} sm={24} md={15} lg={9} xl={9}>
        <Typography.Title level={3}>Sign Up</Typography.Title>
        <Form layout="vertical">
          <Form.Item
            hasFeedback
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: "This field can not be empty" },
              {
                message: "The email address format is invalid",
                validator(rule, value, callback) {
                  return validator.isEmail(value)
                    ? Promise.resolve()
                    : Promise.reject();
                },
              },
            ]}
          >
            <Input placeholder="Please enter your email address" />
          </Form.Item>

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
            rules={[
              { required: true, message: "This field can not be empty" },
              {
                message: "The password is not strong enough",
                validator(rule, value, callback) {
                  return validator.isStrongPassword(value)
                    ? Promise.resolve()
                    : Promise.reject();
                },
              },
            ]}
          >
            <Input.Password placeholder="Please enter your password" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Confirmed Password"
            name="confirmedPassword"
            rules={[
              { required: true, message: "This field can not be empty" },
              ({ getFieldValue }) => ({
                message: "The passwords do not match",
                validator(_, value) {
                  return !value || getFieldValue("password") === value
                    ? Promise.resolve()
                    : Promise.reject();
                },
              }),
            ]}
          >
            <Input.Password placeholder="Please confirm your password again" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
