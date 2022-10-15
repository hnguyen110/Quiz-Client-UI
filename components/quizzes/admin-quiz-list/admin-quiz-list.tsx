import { Button, Card, Col, List, Row } from "antd";
import Item from "antd/lib/list/Item";
import AssignedQuiz from "../../../utilities/types/quizzes/assigned-quiz.type";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import SubmittedQuiz from "../../../utilities/types/quizzes/submitted-quiz.type";

interface Props {
  title: string;
  quizzes: Quiz[];
  onQuizSelectedHandler: any;
}

export default function AdminQuizList({
  title,
  quizzes,
  onQuizSelectedHandler,
}: Props) {
  return (
    <Card
      title={title}
      bordered={false}
      className="w-full h-screen overflow-y-auto"
    >
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24}>
          <List
            itemLayout="horizontal"
            dataSource={quizzes}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  onQuizSelectedHandler(item);
                }}
                actions={[
                  <Button type="primary" key="startQuiz">
                    View Quiz Details
                  </Button>,
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
