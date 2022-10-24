import GenericModal from "../../utilities/generic-modal/generic-modal";
import { Button, Form, FormInstance, Input } from "antd";

interface Props {
  form: FormInstance<any>;
  title: string;
  open: boolean;
  onOkHandler: any;
  onCancelHandler: any;
}

export default function NewCourseDetails({
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
      footer={null}
      onOkHandler={null}
      onCancelHandler={onCancelHandler}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input readOnly placeholder="Please enter the course title" />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input readOnly placeholder="Please enter the course title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input.TextArea
            readOnly
            rows={5}
            placeholder="Please enter the course description"
          />
        </Form.Item>

        <Form.Item>
          <Button onClick={onOkHandler} type="primary" block>
            Buy This Course
          </Button>
        </Form.Item>
      </Form>
    </GenericModal>
  );
}
