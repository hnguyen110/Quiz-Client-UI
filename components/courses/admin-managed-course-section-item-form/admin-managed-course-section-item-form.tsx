import GenericModal from "../../utilities/generic-modal/generic-modal";
import { Button, Form, FormInstance, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import GenericSpin from "../../utilities/generic-spin/generic-spin";

interface Props {
  form: FormInstance<any>;
  title: string;
  open: boolean;
  loading?: boolean;
  onOkHandler: any;
  onCancelHandler: any;
}

export default function AdminManagedCourseSectionItemForm({
  form,
  title,
  open,
  loading,
  onOkHandler,
  onCancelHandler,
}: Props) {
  return (
    <GenericModal
      title={title}
      open={open}
      onOkHandler={onOkHandler}
      onCancelHandler={onCancelHandler}
    >
      {loading ? (
        <GenericSpin />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Title"
            name="title"
            rules={[{ required: true, message: "This field can not be empty" }]}
          >
            <Input placeholder="Please enter the item title" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Order"
            name="order"
            rules={[{ required: true, message: "This field can not be empty" }]}
          >
            <Input placeholder="Please enter the item order" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Media Content File"
            name="data"
            rules={[{ required: true, message: "This field can not be empty" }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Form>
      )}
    </GenericModal>
  );
}
