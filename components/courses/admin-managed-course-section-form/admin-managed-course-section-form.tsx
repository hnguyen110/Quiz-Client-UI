import GenericModal from "../../utilities/generic-modal/generic-modal";
import { Form, FormInstance, Input } from "antd";

interface Props {
  form: FormInstance<any>;
  title: string;
  open: boolean;
  onOkHandler: any;
  onCancelHandler: any;
}

export default function AdminManagedCourseSectionForm({
  form,
  title,
  open,
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
          <Input placeholder="Please enter the course section title" />
        </Form.Item>
      </Form>
    </GenericModal>
  );
}
