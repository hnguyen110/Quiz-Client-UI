import Quiz from "./quiz.type";

export default interface AssignedQuiz {
  id: number;
  quiz: Quiz;
  isComplete: boolean;
}
