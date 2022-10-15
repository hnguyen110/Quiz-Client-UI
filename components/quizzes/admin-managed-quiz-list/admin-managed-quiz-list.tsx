import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAdministratorManagedQuizzes } from "../../../services/quizzes/quizzes.service";
import Quiz from "../../../utilities/types/quizzes/quiz.type";
import AdminQuizList from "../admin-quiz-list/admin-quiz-list";

export default function AdminManagedQuizList() {
  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const session = useSession();

  useEffect(() => {
    getAdministratorManagedQuizzes(session.data as any)
      .then((data) => {
        setQuizzes(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive your quizzes, please try again"
        );
      });
  }, [session.data]);

  return (
    <AdminQuizList
      title={"Manage Quizzes"}
      quizzes={quizzes}
      onQuizSelectedHandler={undefined}
    />
  );
}
