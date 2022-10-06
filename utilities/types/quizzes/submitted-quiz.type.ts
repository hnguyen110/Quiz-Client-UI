import Quiz from "./quiz.type";

export default interface SubmittedQuiz {
    id: number;
    quiz: Quiz;
    isComplete: boolean;
}
