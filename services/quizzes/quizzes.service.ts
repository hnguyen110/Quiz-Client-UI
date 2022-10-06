import axios from "axios";
import Answer from "../../utilities/types/quizzes/answer.type";
import AssignedQuiz from "../../utilities/types/quizzes/assigned-quiz.type";
import Quiz from "../../utilities/types/quizzes/quiz.type";
import Session from "../../utilities/types/utilities/session.type";

export async function getAssignedQuizzes(
  session: Session
): Promise<AssignedQuiz[]> {
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

export async function getAssignedQuizDetails(
  session: Session,
  id: number
): Promise<Quiz> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quizzes/${id}/assigned-quiz-details/`,
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}

export async function submitAssignedQuiz(
  session: Session,
  quizId: number,
  participantId: number,
  answers: Answer[]
): Promise<Answer[]> {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/quizzes/${quizId}/participants/${participantId}/answers/post-answers/`,
    { answers },
    {
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    }
  );
  return data;
}
