import { Checkbox, Radio, Space, Typography } from "antd";
import Question from "../../../utilities/types/quizzes/question/question";

interface Props {
  question: Question;
}

export default function QuizQuestion({ question }: Props) {
  return (
    <Space direction="vertical">
      <Typography.Text strong>{question.description}</Typography.Text>
      {question.type === "single_choice" ? (
        <Radio.Group>
          <Space direction="vertical">
            {question.solutions.map((item) => (
              <Radio key={item.id} value={item.id}>
                {item.description}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      ) : null}
      {question.type === "multiple_choice" ? (
        <Checkbox.Group>
          <Space direction="vertical">
            {question.solutions.map((item) => (
              <Checkbox key={item.id} value={item.id}>
                {item.description}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      ) : null}
    </Space>
  );
}
