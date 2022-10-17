import { Button, List, Popconfirm, Space } from "antd";
import Question from "../../../utilities/types/quizzes/question.type";
import QuizResultAnswer from "../../../utilities/types/quizzes/quiz-result-answer.type";
import GenericDrawer from "../../utilities/generic-drawer/generic-drawer";
import QuizQuestion from "../quiz-question/quiz-question";

interface Props {
  title: string;
  width: string | number;
  open: boolean;
  resultOnly?: boolean;
  answers?: QuizResultAnswer[];
  questions?: Question[];
  onCloseHandler: any;
  onFinishHandler?: any;
}

export default function QuizDetails({
  title,
  width,
  open,
  resultOnly = false,
  answers,
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
      extra={
        <Space>
          <Popconfirm
            placement="bottomRight"
            title="Please confirm again that you would like to close this page"
            onConfirm={onCloseHandler}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Cancel
            </Button>
          </Popconfirm>

          {/* {onFinishHandler !== undefined ?? (

                     )} */}
          <Popconfirm
            placement="bottomRight"
            title="Please confirm again that you would like to save and submit the quiz"
            onConfirm={onFinishHandler}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Save And Submit</Button>
          </Popconfirm>
        </Space>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={
          resultOnly ? answers?.map((item) => item.question) : questions
        }
        renderItem={(item) => (
          <List.Item>
            <QuizQuestion
              question={item}
              resultOnly={resultOnly}
              selectedSolutions={answers
                ?.filter((answer) => item.id === answer.question.id)
                .map((answer) => answer.selected_solution)}
            />
          </List.Item>
        )}
      />
    </GenericDrawer>
  );
}
