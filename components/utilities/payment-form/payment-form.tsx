import { Form, FormInstance, Input } from "antd";
import GenericModal from "../generic-modal/generic-modal";
import { useState } from "react";

interface Props {
  form: FormInstance<any>;
  title: string;
  open: boolean;
  onOkHandler: any;
  onCancelHandler: any;
}

export default function PaymentForm({
  form,
  title,
  open,
  onOkHandler,
  onCancelHandler,
}: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <GenericModal
      title={title}
      open={open}
      confirmLoading={loading}
      onOkHandler={async () => {
        try {
          setLoading(true);
          await onOkHandler();
        } finally {
          setLoading(false);
        }
      }}
      onCancelHandler={onCancelHandler}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Card Number"
          name="number"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input placeholder="Please enter the card number" />
        </Form.Item>

        <Form.Item
          label="Expiry Month"
          name="exp_month"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input placeholder="Please enter the expiry month" />
        </Form.Item>

        <Form.Item
          label="Expiry Year"
          name="exp_year"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input placeholder="Please enter the expiry year" />
        </Form.Item>

        <Form.Item
          label="Security Code"
          name="cvc"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input placeholder="Please enter the security number" />
        </Form.Item>
      </Form>
    </GenericModal>
  );
}
