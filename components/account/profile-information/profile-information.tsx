import { Card, Col, Form, Input, Row } from "antd";
import validator from "validator";

export default function ProfileInformation() {
  return (
    <Card title="Profile Information" bordered={false} className="w-full">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
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
              rules={[
                { required: true, message: "This field can not be empty" },
              ]}
            >
              <Input placeholder="Please enter your username" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
