import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AdminQuizList from "../admin-quiz-list/admin-quiz-list";
import AdminManagedQuizForm from "../admin-managed-quiz-form/admin-managed-quiz-form";
import {
  createQuiz,
  deleteQuiz,
  getAdministratorManagedQuizzes,
  updateQuiz,
} from "../../../services/quizzes/quizzes.service";
import { Button, Form, message } from "antd";
import { AdminManagedQuizzesContext } from "../../../contexts/admin-managed-quizzes.context";
import Quiz from "../../../utilities/types/quizzes/quiz.type";

export default function AdminManagedQuizList() {
  const [quizzes, setQuizzes] = useState([] as Quiz[]);
  const [createQuizFormOpen, setCreateCreateQuizFormOpen] = useState(false);
  const [updateQuizFormOpen, setUpdateCreateQuizFormOpen] = useState(false);
  const [createQuizForm] = Form.useForm();
  const [updateQuizForm] = Form.useForm();
  const session = useSession();

  useEffect(() => {
    getAdministratorManagedQuizzes(session.data as any)
      .then((data) => {
        setQuizzes(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to receive your quizzes, please try again"
        );
      });
  }, [session.data]);

  async function onCreateQuizHandler() {
    const data = await createQuizForm.validateFields();
    try {
      const quiz = await createQuiz(session.data as any, data);
      setQuizzes([quiz, ...quizzes]);
      createQuizForm.resetFields();
      setCreateCreateQuizFormOpen(false);
      message.success("The quiz is created successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to create the quiz, please try again"
      );
    }
  }

  async function onCancelCreateQuizHandler() {
    createQuizForm.resetFields();
    setCreateCreateQuizFormOpen(false);
  }

  async function onQuizSelectedForUpdatingHandler(quiz: Quiz) {
    updateQuizForm.setFieldsValue({
      ...quiz,
    });
    setUpdateCreateQuizFormOpen(true);
  }

  async function onUpdateQuizHandler() {
    const data = await updateQuizForm.validateFields();
    try {
      const quiz = await updateQuiz(session.data as any, data);
      setQuizzes(
        quizzes.map((item) => {
          if (item.id === quiz.id) {
            return {
              ...quiz,
            };
          }
          return item;
        })
      );
      updateQuizForm.resetFields();
      setUpdateCreateQuizFormOpen(false);
      message.success("The quiz is updated successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to update the quiz, please try again"
      );
    }
  }

  async function onCancelUpdateQuizHandler() {
    updateQuizForm.resetFields();
    setUpdateCreateQuizFormOpen(false);
  }

  async function onQuizSelectedForDeletingHandler(quiz: Quiz) {
    try {
      await deleteQuiz(session.data as any, quiz.id);
      setQuizzes(quizzes.filter((item) => item.id !== quiz.id));
      message.success("The quiz is deleted successfully");
    } catch (e) {
      message.error(
        "There was an issue while trying to delete the quiz, please try again"
      );
    }
  }

  return (
    <AdminManagedQuizzesContext.Provider
      value={{
        quizzes,
        setQuizzes,
      }}
    >
      <AdminManagedQuizForm
        form={createQuizForm}
        title="Create Quiz"
        open={createQuizFormOpen}
        onOkHandler={onCreateQuizHandler}
        onCancelHandler={onCancelCreateQuizHandler}
      />
      <AdminManagedQuizForm
        form={updateQuizForm}
        title="Update Quiz"
        open={updateQuizFormOpen}
        onOkHandler={onUpdateQuizHandler}
        onCancelHandler={onCancelUpdateQuizHandler}
      />
      <AdminQuizList
        title={"Manage Quizzes"}
        extra={
          <Button onClick={() => setCreateCreateQuizFormOpen(true)}>
            Create Quiz
          </Button>
        }
        quizzes={quizzes}
        onQuizSelectedHandler={undefined}
        onQuizSelectedForUpdatingHandler={onQuizSelectedForUpdatingHandler}
        onQuizSelectedForDeletingHandler={onQuizSelectedForDeletingHandler}
      />
    </AdminManagedQuizzesContext.Provider>
  );
}
