import { Checkbox, RadioChangeEvent, Space } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useContext } from "react";
import { QuizAnswersContext } from "../../../contexts/quiz-answers.context";
import Question from "../../../utilities/types/quizzes/question.type";

interface Props {
  question: Question;
}

export default function QuizMultipleChoiceQuestion({ question }: Props) {
  const { answers, setAnswers } = useContext(QuizAnswersContext);

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
