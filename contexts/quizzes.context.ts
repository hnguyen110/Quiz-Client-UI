import {createContext, Dispatch, SetStateAction} from "react";
import Answer from "../utilities/types/quizzes/answer.type";
import AssignedQuiz from "../utilities/types/quizzes/assigned-quiz.type";

export const QuizzesContext = createContext({
    answers: [],
    setAnswers: (answers: Answer[]) => {
    },
    quizzes: [],
    setQuizzes: (quizzes: AssignedQuiz[]) => {
    },
} as {
    answers: Answer[];
    setAnswers: Dispatch<SetStateAction<Answer[]>>;
    quizzes: AssignedQuiz[];
    setQuizzes: Dispatch<SetStateAction<AssignedQuiz[]>>;
});
