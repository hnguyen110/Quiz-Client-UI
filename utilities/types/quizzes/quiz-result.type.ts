import QuizResultAnswer from "./quiz-result-answer.type";
import Quiz from "./quiz.type";

export default interface QuizResult {
    id: number;
    isComplete: number;
    quiz: Quiz;
    answers: QuizResultAnswer[];
}
