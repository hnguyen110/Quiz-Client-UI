import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getSubmittedQuizDetails,
  getSubmittedQuizzes,
} from "../../../services/quizzes/quizzes.service";
import QuizResult from "../../../utilities/types/quizzes/quiz-result.type";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import SubmittedQuiz from "../../../utilities/types/quizzes/submitted-quiz.type";
import QuizDetails from "../quiz-details/quiz-details";
import QuizList from "../quiz-list/quiz-list";

export default function SubmittedQuizList() {
  const [open, setOpen] = useState(false);
  const [quizDetails, setQuizDetails] = useState(null as null | QuizResult);
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

  async function onQuizSelectedHandler(data: Quiz) {
    try {
      const submittedQuiz = quizzes.find(
        (item) => item.quiz.id === data.id
      ) as SubmittedQuiz;
      const response = await getSubmittedQuizDetails(
        session.data as any,
        submittedQuiz.quiz.id,
        submittedQuiz.id
      );
      setQuizDetails(response);
      setOpen(true);
    } catch (e) {
      message.error(
        "There was an issue while trying to retrieve the quiz details, please try again"
      );
    }
  }

  function onCloseHandler() {
    setOpen(false);
  }

  return (
    <div>
      <QuizDetails
        resultOnly
        answers={quizDetails?.answers}
        title={quizDetails?.quiz?.title ?? ""}
        width={"100%"}
        open={open}
        onCloseHandler={onCloseHandler}
      />
      <QuizList
        title="Submitted Quizzes"
        quizzes={quizzes}
        onQuizSelectedHandler={onQuizSelectedHandler}
        resultOnly={true}
      />
    </div>
  );
}
