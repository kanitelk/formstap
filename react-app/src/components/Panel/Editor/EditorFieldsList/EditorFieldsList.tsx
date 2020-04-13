import React, { useContext } from "react";
import "./EditorFieldsList.scss";
import { Button, List, Typography, Collapse } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { EditorStoreContext } from "../../../../stores/editorStore";
import { FieldTypeEnum } from "../../../Form/types";
import InputSettings from "../FieldsSettings/InputSettings";
import TextareaSettings from "../FieldsSettings/TextareaSettings";
import PhoneSettings from "../FieldsSettings/PhoneSettings";
import EmailSettings from "../FieldsSettings/EmailSettings";
import DateSettings from "../FieldsSettings/DateSettings";
import NumberSettings from "../FieldsSettings/NumberSettings";

const { Panel } = Collapse;

const EditorFieldsList: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);

  return (
    <div className="editor-fields-list">
      <Collapse accordion>
        {editorStore.form?.fields.map((field) => (
          <Panel
            key={field._id!}
            header={`${field.type}` + ` ${field.title ? field.title : ""}`}
          >
            {field.type === FieldTypeEnum.input && (
              <InputSettings field={field} />
            )}
            {field.type === FieldTypeEnum.textarea && (
              <TextareaSettings field={field} />
            )}
            {field.type === FieldTypeEnum.phone && (
              <PhoneSettings field={field} />
            )}
            {field.type === FieldTypeEnum.email && (
              <EmailSettings field={field} />
            )}
            {field.type === FieldTypeEnum.date && (
              <DateSettings field={field} />
            )}
            {field.type === FieldTypeEnum.number && (
              <NumberSettings field={field} />
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
});

export default EditorFieldsList;
