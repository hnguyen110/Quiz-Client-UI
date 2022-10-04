import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAssignedQuizzes } from "../../../services/quizzes/quizzes.service";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import QuizList from "../quiz-list/quiz-list";

export default function AssignedQuizzList() {
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([] as Quiz[]);
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
    <QuizList
      title="Assigned Quizzes"
      open={open}
      setOpen={setOpen}
      quizzes={quizzes}
    />
  );
}
