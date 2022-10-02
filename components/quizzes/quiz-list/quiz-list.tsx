import { Card, Col, List, Row } from "antd";
import { useState } from "react";
import Quiz from "../../../utilities/types/quizzes/quiz";
import QuizDetails from "../quiz-details/quiz-details";

interface Props {
  title: string;
  open: boolean;
  setOpen: any;
  quizzes: Quiz[];
}

export default function QuizList({ title, open, setOpen, quizzes }: Props) {
  const [selectedQuiz, setSelectedQuiz] = useState(null as null | Quiz);

  function onQuizSelectedHandler(quiz: Quiz) {
    setSelectedQuiz(quiz);
    setOpen(true);
  }

  return (
    <div>
      <QuizDetails
        title={selectedQuiz?.title ?? ""}
        width={"100%"}
        open={open}
        onCloseHandler={() => setOpen(false)}
        questions={[]}
      />
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
                  actions={[<a key="startQuiz">Start Quiz</a>]}
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
    </div>
  );
}
