import { Button, Card, Col, List, message, Row } from "antd";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { QuizzesContext } from "../../../contexts/quizzes.context";
import {
  getAssignedQuizDetails,
  submitAssignedQuiz,
} from "../../../services/quizzes/quizzes.service";
import AssignedQuiz from "../../../utilities/types/quizzes/assigned-quiz.type";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import QuizDetails from "../quiz-details/quiz-details";

interface Props {
  title: string;
  open: boolean;
  setOpen: any;
}

export default function QuizList({ title, open, setOpen }: Props) {
  const [quiz, setQuiz] = useState(null as null | Quiz);
  const { answers, quizzes, setQuizzes } = useContext(QuizzesContext);
  const session = useSession();

  async function onQuizSelectedHandler(data: Quiz) {
    try {
      const { questions } = await getAssignedQuizDetails(
        session.data as any,
        data.id
      );
      setQuiz({ ...data, questions });
      setOpen(true);
    } catch (e) {
      message.error(
        "There was an issue while trying to retrieve the quiz details, please try again"
      );
    }
  }

  async function onCloseHandler() {
    setOpen(false);
  }

  async function onFinishHandler() {
    let ids = Array.from(
      new Set(
        answers.map((item) => {
          return item.question;
        })
      )
    );
    if (ids.length === quiz?.questions.length) {
      try {
        const { id } = quizzes.find(
          (item) => item.quiz.id === quiz.id
        ) as AssignedQuiz;
        await submitAssignedQuiz(session.data as any, quiz.id, id, answers);
        setQuizzes(quizzes.filter((item) => item.quiz.id !== quiz.id));
        setOpen(false);
        message.success("The quiz submission process is successful");
      } catch (e) {
        message.error(
          "There was an issue during the quiz submission process, please try again"
        );
      }
    } else {
      message.error(
        "Some questions are not answered yet, please provide your answers to these questions and try again"
      );
    }
  }

  return (
    <>
      <QuizDetails
        title={quiz?.title ?? ""}
        width={"100%"}
        open={open}
        onCloseHandler={onCloseHandler}
        onFinishHandler={onFinishHandler}
        questions={quiz?.questions ?? []}
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
              dataSource={quizzes.map((item) => item.quiz)}
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
    </>
  );
}
