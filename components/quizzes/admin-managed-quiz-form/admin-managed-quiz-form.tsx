import GenericModal from "../../utilities/generic-modal/generic-modal";
import { Form, Input } from "antd";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import { useEffect } from "react";

interface Props {
  quiz?: Quiz;
  title: string;
  open: boolean;
  onOkHandler: any;
  onCancelHandler: any;
}

export default function AdminManagedQuizForm({
  quiz,
  title,
  open,
  onOkHandler,
  onCancelHandler,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (quiz) {
      form.setFieldsValue({
        title: quiz.title,
        description: quiz.description,
      });
    }
  }, [form, quiz]);

  return (
    <GenericModal
      title={title}
      open={open}
      onOkHandler={onOkHandler}
      onCancelHandler={onCancelHandler}
    >
      <Form form={form} layout="vertical">
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
          <Input placeholder="Please enter the quiz description" />
        </Form.Item>
      </Form>
    </GenericModal>
  );
}
