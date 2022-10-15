import GenericModal from "../../utilities/generic-modal/generic-modal";
import { Form, FormInstance, Input } from "antd";
import Quiz from "../../../utilities/types/quizzes/quiz.type";

interface Props {
  quiz?: Quiz;
  form: FormInstance<any>;
  title: string;
  open: boolean;
  onOkHandler: any;
  onCancelHandler: any;
}

export default function AdminManagedQuizForm({
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
          <Input placeholder="Please enter the quiz title" />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Description"
          name="description"
          rules={[{ required: true, message: "This field can not be empty" }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="Please enter the quiz description"
          />
        </Form.Item>
      </Form>
    </GenericModal>
  );
}
