import { createContext, Dispatch, SetStateAction } from "react";
import Quiz from "../utilities/types/quizzes/quiz.type";

export const AdminManagedQuizzesContext = createContext({
  quizzes: [],
  setQuizzes: () => {},
} as {
  quizzes: Quiz[];
  setQuizzes: Dispatch<SetStateAction<Quiz[]>>;
});
