import { Space, Typography } from "antd";
import Question from "../../../utilities/types/quizzes/question.type";
import QuizMultipleChoiceQuestion from "../quiz-multiple-choice-question/quiz-multiple-choice-question";
import QuizQuestionResult from "../quiz-question-result/quiz-question-result";
import QuizSingleChoiceQuestion from "../quiz-single-choice-question/quiz-single-choice-question";

interface Props {
  question: Question;
  resultOnly: boolean;
}

export default function QuizQuestion({ question, resultOnly }: Props) {
  return (
    <Space direction="vertical" className="w-full">
      <Typography.Text strong>{question.description}</Typography.Text>
      {resultOnly ? (
        <QuizQuestionResult question={question} />
      ) : question.type === "single_choice" ? (
        <QuizSingleChoiceQuestion question={question} />
      ) : (
        <QuizMultipleChoiceQuestion question={question} />
      )}
    </Space>
  );
}
