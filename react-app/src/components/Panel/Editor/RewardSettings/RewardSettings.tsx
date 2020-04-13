import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import "./RewardSettings.scss";
import { EditorStoreContext } from "../../../../stores/editorStore";
import { Form, Input, Button, message, Switch, InputNumber } from "antd";
import { updateRewardSettings } from "../../../../services/editorAPI";
import { httpErrorHandler } from "../../../../services/utils";
import copy from "copy-to-clipboard";
var QRCode = require("qrcode.react");

const RewardSettings: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);
  const save = async ({ coin, amount, is_active, is_auto }: any) => {
    try {
      await updateRewardSettings(
        editorStore.form?._id!,
        coin,
        amount,
        is_active,
        is_auto
      );
      message.success("Settings updated");
      editorStore.updateCurrentForm();
    } catch (error) {
      httpErrorHandler(error);
    }
  };
  const copyAddress = () => {
    copy(editorStore.form?.reward.address!);
    message.success("Address copied!");
  };
    const copySeed = () => {
      copy(editorStore.form?.reward.seed!);
      message.success("Seed copied!");
    };
  return (
    <div className="reward-settings">
      <div className="address">
        <QRCode value={editorStore.form?.reward.address} />
        <div className="actions">
          <Button onClick={copyAddress}>Address</Button>
          <Button onClick={copySeed}>Seed</Button>
        </div>
      </div>
      <Form
        name="reward-settings"
        className="reward-settings__form"
        initialValues={{
          is_active: editorStore.form?.reward.is_active,
          is_auto: editorStore.form?.reward.is_auto,
          coin: editorStore.form?.reward.coin,
          amount: editorStore.form?.reward.amount,
        }}
        onFinish={save}
      >
        <Form.Item name="coin" label="Coin">
          <Input />
        </Form.Item>
        <Form.Item name="amount" label="Amount">
          <InputNumber />
        </Form.Item>
        <Form.Item name="is_active" label="Is active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item
          name="is_auto"
          label="Is automatically"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default RewardSettings;
