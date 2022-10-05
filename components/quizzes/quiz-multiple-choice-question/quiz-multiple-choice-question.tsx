import { Checkbox, Space } from "antd";
import Question from "../../../utilities/types/quizzes/question.type";

interface Props {
  question: Question;
}

export default function QuizMultipleChoiceQuestion({ question }: Props) {
  return (
    <Checkbox.Group>
      <Space direction="vertical">
        {question.solutions.map((item) => (
          <Checkbox key={item.id} value={item.id}>
            {item.description}
          </Checkbox>
        ))}
      </Space>
    </Checkbox.Group>
  );
}
