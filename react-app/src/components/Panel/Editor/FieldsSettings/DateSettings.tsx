import { Button, Form, Input, message } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

import { updateField, deleteField } from "../../../../services/editorAPI";
import { httpErrorHandler } from "../../../../services/utils";
import { EditorStoreContext } from "../../../../stores/editorStore";
import { TField } from "../../../Form/types";
import { FormStoreContext } from "../../../../stores/formStore";

const DateSettings: React.FC<{ field: TField }> = observer(({ field }) => {
  const editorStore = useContext(EditorStoreContext);
  const formStore = useContext(FormStoreContext);
  const delField = async () => {
    try {
      await deleteField(field._id!);
      message.success("Field updated");
      editorStore.updateCurrentForm();
      formStore.updateCurrentForm();
    } catch (error) {
      httpErrorHandler(error);
    }
  };
  const save = async ({ title, notifications, is_active }: any) => {
    try {
      const newField = { ...field, title: title };
      await updateField(field._id!, newField);
      message.success("Field updated");
      editorStore.updateCurrentForm();
      formStore.updateCurrentForm();
    } catch (error) {
      httpErrorHandler(error);
    }
  };
  return (
    <Form
      className="date-settings"
      initialValues={{
        title: field.title,
      }}
      onFinish={save}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item>
        <div className="actions">
          <Button htmlType="submit">Save</Button>
          <Button onClick={delField}>Delete</Button>
        </div>
      </Form.Item>
    </Form>
  );
});

export default DateSettings;
