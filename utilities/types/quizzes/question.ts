import Solution from "./solution";

export default interface Question {
  id: number;
  type: string;
  description: string;
  solutions: Solution[];
}
