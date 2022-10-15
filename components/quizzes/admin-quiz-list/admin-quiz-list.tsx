import { Card, Col, List, Row } from "antd";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import ItemActionsDropdownButton from "./item-actions-dropdown-button";

interface Props {
  title: string;
  extra?: any;
  quizzes: Quiz[];
  onQuizSelectedHandler: any;
  onQuizSelectedForUpdatingHandler: any;
  onQuizSelectedForDeletingHandler: any;
}

export default function AdminQuizList({
  title,
  extra,
  quizzes,
  onQuizSelectedHandler,
  onQuizSelectedForUpdatingHandler,
  onQuizSelectedForDeletingHandler,
}: Props) {
  return (
    <Card
      title={title}
      bordered={false}
      className="w-full h-screen overflow-y-auto"
      extra={extra}
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <List
            itemLayout="horizontal"
            dataSource={quizzes}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <ItemActionsDropdownButton
                    key={item.id}
                    quiz={item}
                    onQuizSelectedHandler={onQuizSelectedHandler}
                    onQuizSelectedForUpdatingHandler={
                      onQuizSelectedForUpdatingHandler
                    }
                    onQuizSelectedForDeletingHandler={
                      onQuizSelectedForDeletingHandler
                    }
                  />,
                ]}
              >
                <List.Item.Meta
                  title={<a>{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Card>
  );
}
