import { Form, Input, message, Modal, Typography } from "antd";
import { useSession } from "next-auth/react";
import validator from "validator";
import { confirmPasswordChange } from "../../../services/account/account.service";

interface Props {
  visible: boolean;
  setVisible: any;
}

export default function ConfirmPasswordChange({ visible, setVisible }: Props) {
  const [form] = Form.useForm();
  const session = useSession();

  async function onOkHandler() {
    try {
      const { token, password } = await form.validateFields();
      await confirmPasswordChange(session as any, token, password);
      setVisible(false);
      message.success("The password-changing process is successful");
    } catch (e) {
      message.error(
        "There was an issue during the password-changing process, please try again"
      );
    }
  }

  function onCancelHandler() {
    setVisible(false);
  }

  return (
    <Modal
      title="Confirm Password Change"
      className="top-8"
      visible={visible}
      onOk={onOkHandler}
      onCancel={onCancelHandler}
    >
      <Form form={form} layout="vertical">
        <Form.Item>
          <Typography.Text strong>
            A verification code has been sent to your email, please check your
            inbox to retrieve the code.
          </Typography.Text>
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Confirmation Code"
          name="token"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input.Password placeholder="Please enter the confirmation code" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="New Password"
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
          <Input.Password placeholder="Please enter your new password" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Confirmed New Password"
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
          <Input.Password placeholder="Please confirm your new password again" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
