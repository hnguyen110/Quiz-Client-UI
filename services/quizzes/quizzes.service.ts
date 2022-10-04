import axios from "axios";
import Quiz from "../../utilities/types/quizzes/quiz.type";
import Session from "../../utilities/types/utilities/session.type";

export async function getAssignedQuizzes(session: Session): Promise<Quiz[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quizzes/assigned-quizzes/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
