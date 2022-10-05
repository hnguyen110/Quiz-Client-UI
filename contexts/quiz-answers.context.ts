import { createContext, Dispatch, SetStateAction } from "react";
import Answer from "../utilities/types/quizzes/answer.type";

export const QuizAnswersContext = createContext({
  answers: [],
  setAnswers: (answers: Answer[]) => {},
} as {
  answers: Answer[];
  setAnswers: Dispatch<SetStateAction<Answer[]>>;
});
