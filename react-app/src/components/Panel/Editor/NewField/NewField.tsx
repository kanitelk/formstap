import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Modal from "antd/lib/modal/Modal";
import { Button, Form, Select, Input } from "antd";
import { AppStoreContext } from "../../../../stores/appStore";
import { EditorStoreContext } from "../../../../stores/editorStore";
import { httpErrorHandler } from "../../../../services/utils";
import { newField } from "../../../../services/editorAPI";
import { useParams } from "react-router-dom";
import { FormStoreContext } from "../../../../stores/formStore";

const FieldTypes = [
  "input",
  "textarea",
  "number",
  "phone",
  "email",
  "dropdown",
  "date",
];

const NewField: React.FC<any> = observer(() => {
  const { Option } = Select;

  const store = useContext(AppStoreContext);
  const formStore = useContext(FormStoreContext);
  const editorStore = useContext(EditorStoreContext);

  const submit = async ({type, title}: any) => {
    try {
      let r = await newField(type, title, editorStore.form?._id!);
      console.log(r);
      formStore.updateCurrentForm();
      editorStore.updateCurrentForm();
    } catch (error) {
      httpErrorHandler(error)
    }
  }
  return (
    <div className="new-field">
      <Form onFinish={submit} initialValues={{type: "input"}}>
        <Form.Item name="type" label="Type" required>
          <Select>
            {FieldTypes.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default NewField;
