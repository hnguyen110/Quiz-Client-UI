import { Checkbox, Space } from "antd";
import { useContext } from "react";
import { QuizzesContext } from "../../../contexts/quizzes.context";
import Question from "../../../utilities/types/quizzes/question.type";

interface Props {
  question: Question;
}

export default function QuizMultipleChoiceQuestion({ question }: Props) {
  const { answers, setAnswers } = useContext(QuizzesContext);

  function onChangeHandler(values: any) {
    const answer = answers.find((item) => item.question === question.id);
    if (answer) {
      const temp = answers.filter((item) => item.question !== question.id);
      setAnswers([
        ...values.map((item: number) => {
          return { question: question.id, selected_solution: item };
        }),
        ...temp,
      ]);
    } else {
      setAnswers([
        ...values.map((item: number) => {
          return { question: question.id, selected_solution: item };
        }),
        ...answers,
      ]);
    }
  }

  return (
    <Checkbox.Group onChange={onChangeHandler}>
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
