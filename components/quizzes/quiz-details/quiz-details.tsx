import { List } from "antd";
import Question from "../../../utilities/types/quizzes/question";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import QuizQuestion from "../quiz-question/quiz-question";

interface Props {
  title: string;
  width: string | number;
  open: boolean;
  withResults?: boolean;
  questions: Question[];
  onCloseHandler: any;
}

export default function QuizDetails({
  title,
  width,
  open,
  withResults = false,
  questions,
  onCloseHandler,
}: Props) {
  return (
    <GenericDrawer
      title={title}
      placement={"right"}
      width={width}
      open={open}
      onCloseHandler={onCloseHandler}
    >
      <List
        itemLayout="horizontal"
        dataSource={questions}
        renderItem={(item) => (
          <List.Item>
            <QuizQuestion resultOnly question={item} />
          </List.Item>
        )}
      />
    </GenericDrawer>
  );
}
