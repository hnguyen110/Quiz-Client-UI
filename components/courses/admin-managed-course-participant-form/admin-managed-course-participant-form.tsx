import { Form, FormInstance, Input, message, Select } from "antd";
import GenericModal from "../../utilities/generic-modal/generic-modal";
import { useEffect, useState } from "react";
import User from "../../../utilities/types/account/user.type";
import { getUsers } from "../../../services/account/account.service";
import { useSession } from "next-auth/react";

const { Option } = Select;

interface Props {
  form: FormInstance<any>;
  title: string;
  open: boolean;
  onOkHandler: any;
  onCancelHandler: any;
}

export default function AdminManagedCourseParticipantForm({
  form,
  title,
  open,
  onOkHandler,
  onCancelHandler,
}: Props) {
  const [users, setUsers] = useState([] as User[]);
  const session = useSession();

  useEffect(() => {
    getUsers(session.data as any)
      .then((data) => {
        setUsers(data);
      })
      .catch((e) => {
        message.error(
          "There was an issue while trying to retrieve user information list, please try again"
        );
      });
  }, [session.data]);

  return (
    <GenericModal
      title={title}
      open={open}
      onOkHandler={onOkHandler}
      onCancelHandler={onCancelHandler}
    >
      <Form form={form} layout="vertical">
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item hasFeedback label="Participants" name="participants">
          <Select
            options={users.map((item) => {
              return { value: item.id, label: item.username };
            })}
            mode="multiple"
            allowClear
            placeholder="Please select the course participants"
          />
        </Form.Item>
      </Form>
    </GenericModal>
  );
}
