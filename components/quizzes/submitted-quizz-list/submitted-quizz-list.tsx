import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getSubmittedQuizzes } from "../../../services/quizzes/quizzes.service";
import SubmittedQuiz from "../../../utilities/types/quizzes/submitted-quiz.type";
import QuizList from "../quiz-list/quiz-list";

export default function SubmittedQuizzList() {
  const [quizzes, setQuizzes] = useState([] as SubmittedQuiz[]);
  const session = useSession();

  useEffect(() => {
    getSubmittedQuizzes(session.data as any)
      .then((data) => {
        setQuizzes(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive your submitted quizzes, please try again"
        );
      });
  }, [session.data]);

  return (
    <QuizList
      title="Submitted Quizzes"
      quizzes={quizzes}
      onQuizSelectedHandler={null}
      resultOnly={true}
    />
  );
}
