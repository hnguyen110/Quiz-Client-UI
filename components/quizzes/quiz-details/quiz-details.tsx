import { List } from "antd";
import { useState } from "react";
import { QuizAnswersContext } from "../../../contexts/quiz-answers.context";
import Answer from "../../../utilities/types/quizzes/answer.type";
import Question from "../../../utilities/types/quizzes/question.type";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import QuizQuestion from "../quiz-question/quiz-question";

interface Props {
  title: string;
  width: string | number;
  open: boolean;
  resultOnly?: boolean;
  questions: Question[];
  onCloseHandler: any;
}

export default function QuizDetails({
  title,
  width,
  open,
  resultOnly = false,
  questions,
  onCloseHandler,
}: Props) {
  const [answers, setAnswers] = useState([] as Answer[]);

  console.log(answers);

  return (
    <GenericDrawer
      title={title}
      placement={"right"}
      width={width}
      open={open}
      onCloseHandler={onCloseHandler}
    >
      <QuizAnswersContext.Provider value={{ answers, setAnswers }}>
        <List
          itemLayout="horizontal"
          dataSource={questions}
          renderItem={(item) => (
            <List.Item>
              <QuizQuestion resultOnly={resultOnly} question={item} />
            </List.Item>
          )}
        />
      </QuizAnswersContext.Provider>
    </GenericDrawer>
  );
}
