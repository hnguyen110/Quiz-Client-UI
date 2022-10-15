import Solution from "./solution.type";

export default interface QuizResultAnswer {
  id: number;
  result: number;
  question: {
    id: number;
    type: string;
    description: string;
    solutions: Solution[];
  };
  selected_solution: Solution;
}
