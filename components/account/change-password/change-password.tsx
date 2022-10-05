import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import validator from "validator";
import {
  changePassword,
  getProfileInformation,
} from "../../../services/account/account.service";
import Profile from "../../../utilities/types/profile-information/profile-information";
import ConfirmPasswordChange from "../confirm-password-change/confirm-password-change";

export default function ChangePassword() {
  const [form] = Form.useForm();
  const [profile, setProfile] = useState(null as null | Profile);
  const [visible, setVisible] = useState(false);
  const session = useSession();

  useEffect(() => {
    getProfileInformation(session.data as any)
      .then((data) => {
        form.setFieldsValue({
          ...data,
        });
        setProfile(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive your information, please try again"
        );
      });
  }, [form, session.data]);

  async function onFinishHandler(data: any) {
    if (profile?.email) {
      try {
        await changePassword(session as any, profile.email);
        setVisible(true);
        message.success(
          "The password-changing request has been made, please check your email for the verification code"
        );
      } catch (e) {
        message.error(
          "There was an issue during the password-changing process, please try again"
        );
      }
    }
  }

  return (
    <div>
      <ConfirmPasswordChange visible={visible} setVisible={setVisible} />
      <Card title="Change Password" bordered={false} className="w-full">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form form={form} onFinish={onFinishHandler} layout="vertical">
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
                <Input readOnly placeholder="Please enter your email address" />
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
    </div>
  );
}
