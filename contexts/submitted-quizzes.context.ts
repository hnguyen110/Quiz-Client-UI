import {createContext, Dispatch, SetStateAction} from "react";
import AssignedQuiz from "../utilities/types/quizzes/assigned-quiz.type";
import SubmittedQuiz from "../utilities/types/quizzes/submitted-quiz.type";

export const SubmittedQuizzesContext = createContext({
    quizzes: [],
    setQuizzes: (quizzes: SubmittedQuiz[]) => {},
} as {
    quizzes: AssignedQuiz[];
    setQuizzes: Dispatch<SetStateAction<AssignedQuiz[]>>;
});
