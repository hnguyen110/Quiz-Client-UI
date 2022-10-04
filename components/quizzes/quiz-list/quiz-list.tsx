import { Button, Card, Col, List, message, Row } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getAssignedQuizDetails } from "../../../services/quizzes/quizzes.service";
import Question from "../../../utilities/types/quizzes/question.type";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import QuizDetails from "../quiz-details/quiz-details";

interface Props {
  title: string;
  open: boolean;
  setOpen: any;
  quizzes: Quiz[];
}

export default function QuizList({ title, open, setOpen, quizzes }: Props) {
  const [questions, setQuestions] = useState([] as Question[]);
  const session = useSession();

  async function onQuizSelectedHandler(quiz: Quiz) {
    try {
      const { questions } = await getAssignedQuizDetails(
        session.data as any,
        quiz.id
      );
      setQuestions(questions);
      setOpen(true);
    } catch (e) {
      message.error(
        "There was an issue while trying to retrieve the quiz details, please try again"
      );
    }
  }

  return (
    <div>
      <QuizDetails
        title={title ?? ""}
        width={"100%"}
        open={open}
        onCloseHandler={() => setOpen(false)}
        questions={questions}
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
                  actions={[
                    <Button type="primary" key="startQuiz">
                      Start Quiz
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
    </div>
  );
}
