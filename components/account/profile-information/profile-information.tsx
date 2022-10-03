import { Card, Col, Form, Input, message, Row } from "antd";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import validator from "validator";
import { getProfileInformation } from "../../../services/account/account.service";

export default function ProfileInformation() {
  const [form] = Form.useForm();

  useEffect(() => {
    getSession()
      .then((session: any) => getProfileInformation(session))
      .then((data) => {
        form.setFieldsValue({
          ...data,
        });
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive your profile information, please try again"
        );
      });
  }, [form]);

  return (
    <Card title="Profile Information" bordered={false} className="w-full">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Form form={form} layout="vertical">
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
