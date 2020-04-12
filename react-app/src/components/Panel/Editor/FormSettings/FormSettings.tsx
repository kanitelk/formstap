import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import "./FormSettings.scss";
import { EditorStoreContext } from "../../../../stores/editorStore";
import { Form, Input, Button, Switch, message } from "antd";
import { httpErrorHandler } from "../../../../services/utils";
import { updateFormSettings } from "../../../../services/editorAPI";

const FormSettings: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);
  const save = async ({title, notifications, is_active}: any) => {
    try {
      await updateFormSettings(editorStore.form?._id!, title, is_active, notifications);
      message.success('Settings updated')
    } catch (error) {
      httpErrorHandler(error)
    }
  }
  return (
    <Form
      name="sorm-settings"
      className="form-settings"
      initialValues={{
        title: editorStore.form?.title,
        notifications: editorStore.form?.settings.notifications,
        is_active: editorStore.form?.settings.is_active,
      }}
      onFinish={save}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="notifications" label="Notification email">
        <Input type="email" />
      </Form.Item>
      <Form.Item name="is_active" label="Is active" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
});

export default FormSettings;
