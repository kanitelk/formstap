import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import "./FormSettings.scss";
import { EditorStoreContext } from "../../../../stores/editorStore";
import { Form, Input, Button, Switch, message } from "antd";
import { httpErrorHandler } from "../../../../services/utils";
import { updateFormSettings } from "../../../../services/editorAPI";

const FormSettings: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);
  const save = async ({
    title,
    notifications,
    is_active,
    check_fingerprint,
    check_ip,
    check_telegram,
  }: any) => {
    try {
      await updateFormSettings(
        editorStore.form?._id!,
        title,
        notifications,
        is_active,
        check_fingerprint,
        check_ip,
        check_telegram
      );
      message.success("Settings updated");
    } catch (error) {
      httpErrorHandler(error);
    }
  };
  return (
    <Form
      name="form-settings"
      className="form-settings"
      initialValues={{
        title: editorStore.form?.title,
        notifications: editorStore.form?.settings.notifications,
        is_active: editorStore.form?.settings.is_active,
        check_fingerprint: editorStore.form?.settings.check_fingerprint,
        check_ip: editorStore.form?.settings.check_ip,
        check_telegram: editorStore.form?.settings.check_telegram,
      }}
      onFinish={save}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      {/* <Form.Item name="notifications" label="Notification email">
        <Input type="email" />
      </Form.Item> */}
      <Form.Item name="is_active" label="Is active" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        name="check_fingerprint"
        label="Check Browser Fingerprint"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item name="check_ip" label="Check IP" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        name="check_telegram"
        label="Check Telegram"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
});

export default FormSettings;
