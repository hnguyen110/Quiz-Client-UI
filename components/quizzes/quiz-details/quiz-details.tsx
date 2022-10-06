import { List } from "antd";
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
  onFinishHandler: any;
}

export default function QuizDetails({
  title,
  width,
  open,
  resultOnly = false,
  questions,
  onCloseHandler,
  onFinishHandler,
}: Props) {
  return (
    <GenericDrawer
      title={title}
      placement={"right"}
      width={width}
      open={open}
      onCloseHandler={onCloseHandler}
      onFinishHandler={onFinishHandler}
    >
      <List
        itemLayout="horizontal"
        dataSource={questions}
        renderItem={(item) => (
          <List.Item>
            <QuizQuestion resultOnly={resultOnly} question={item} />
          </List.Item>
        )}
      />
    </GenericDrawer>
  );
}
