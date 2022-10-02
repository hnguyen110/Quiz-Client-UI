import { useState } from "react";
import QuizList from "../quiz-list/quiz-list";

export default function SubmittedQuizzList() {
  const [open, setOpen] = useState(false);
  return (
    <QuizList
      title="Submitted Quizzes"
      open={open}
      setOpen={setOpen}
      quizzes={[
        {
          title: "AWS Final",
          description: "AWS Final Quiz",
        },
      ]}
    />
  );
}
