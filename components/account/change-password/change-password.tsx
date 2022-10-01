import { Button, Card, Col, Form, Input, Row } from "antd";
import validator from "validator";

export default function ChangePassword() {
  return (
    <Card title="Change Password" bordered={false} className="w-full">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Form layout="vertical">
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
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
