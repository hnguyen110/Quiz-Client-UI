import { useState } from "react";
import QuizList from "../quiz-list/quiz-list";

export default function AssignedQuizzList() {
  const [open, setOpen] = useState(false);
  return (
    <QuizList
      title="Assigned Quizzes"
      open={open}
      setOpen={setOpen}
      quizzes={[]}
    />
  );
}
