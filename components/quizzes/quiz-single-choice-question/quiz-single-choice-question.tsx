import { Radio, RadioChangeEvent, Space } from "antd";
import { useContext } from "react";
import { QuizAnswersContext } from "../../../contexts/quiz-answers.context";
import Question from "../../../utilities/types/quizzes/question.type";

interface Props {
  question: Question;
}

export default function QuizSingleChoiceQuestion({ question }: Props) {
  const { answers, setAnswers } = useContext(QuizAnswersContext);

  function onChangeHandler(event: RadioChangeEvent) {
    const answer = answers.find((item) => item.question === question.id);
    if (answer) {
      setAnswers(
        answers.map((item) => {
          if (item.question === question.id) {
            return {
              ...item,
              selected_solution: event.target.value,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setAnswers([
        { question: question.id, selected_solution: event.target.value },
        ...answers,
      ]);
    }
  }

  return (
    <Radio.Group onChange={onChangeHandler}>
      <Space direction="vertical">
        {question.solutions.map((item) => (
          <Radio key={item.id} value={item.id}>
            {item.description}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
}
