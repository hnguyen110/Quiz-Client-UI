import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { QuizzesContext } from "../../../contexts/quizzes.context";
import { getAssignedQuizzes } from "../../../services/quizzes/quizzes.service";
import Answer from "../../../utilities/types/quizzes/answer.type";
import AssignedQuiz from "../../../utilities/types/quizzes/assigned-quiz.type";
import QuizList from "../quiz-list/quiz-list";

export default function AssignedQuizzList() {
  const [answers, setAnswers] = useState([] as Answer[]);
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([] as AssignedQuiz[]);
  const session = useSession();

  useEffect(() => {
    getAssignedQuizzes(session.data as any)
      .then((data) => {
        setQuizzes(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive your assigned quizzes, please try again"
        );
      });
  }, [session.data]);

  return (
    <QuizzesContext.Provider
      value={{ answers, setAnswers, quizzes, setQuizzes }}
    >
      <QuizList
        title="Assigned Quizzes"
        open={open}
        setOpen={setOpen}
        quizzes={quizzes}
      />
    </QuizzesContext.Provider>
  );
}
