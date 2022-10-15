import Solution from "./solution.type";

export default interface Question {
  id: number;
  type: string;
  description: string;
  solutions: Solution[];
  // selected_solution?: Solution[];
}
