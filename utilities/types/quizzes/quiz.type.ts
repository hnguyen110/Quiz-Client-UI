import Question from "./question.type";

export default interface Quiz {
    id: number;
    title: string;
    description: string;
    questions: Question[];
}
