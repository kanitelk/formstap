import React, { useContext } from "react";
import "./EditorFieldsList.scss";
import { Button, List, Typography, Collapse, Spin } from "antd";
import {
  PlusCircleOutlined,
  PlusOutlined,
  EnterOutlined,
  AlignLeftOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
  FieldBinaryOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { EditorStoreContext } from "../../../../stores/editorStore";
import { FieldTypeEnum, TField } from "../../../Form/types";
import InputSettings from "../FieldsSettings/InputSettings";
import TextareaSettings from "../FieldsSettings/TextareaSettings";
import PhoneSettings from "../FieldsSettings/PhoneSettings";
import EmailSettings from "../FieldsSettings/EmailSettings";
import DateSettings from "../FieldsSettings/DateSettings";
import NumberSettings from "../FieldsSettings/NumberSettings";

const { Panel } = Collapse;

const getFieldHeader = (field: TField) => {
  switch (field.type) {
    case FieldTypeEnum.input:
      return (
        <>
          <EnterOutlined /> {field.title ? field.title : ""}
        </>
      );
    case FieldTypeEnum.textarea:
      return (
        <>
          <AlignLeftOutlined /> {field.title ? field.title : ""}
        </>
      );
    case FieldTypeEnum.date:
      return (
        <>
          <CalendarOutlined /> {field.title ? field.title : ""}
        </>
      );
    case FieldTypeEnum.phone:
      return (
        <>
          <PhoneOutlined /> {field.title ? field.title : ""}
        </>
      );
    case FieldTypeEnum.email:
      return (
        <>
          <MailOutlined /> {field.title ? field.title : ""}
        </>
      );
    case FieldTypeEnum.number:
      return (
        <>
          <FieldBinaryOutlined /> {field.title ? field.title : ""}
        </>
      );
    default:
      return <>Field {field.title ? field.title : ""}</>;
  }
};

const EditorFieldsList: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);

  return (
    <div className="editor-fields-list">
      <Spin spinning={editorStore.isLoading}>
        <Collapse
          accordion
          expandIconPosition="right"
          expandIcon={() => <CaretDownOutlined />}
        >
          {editorStore.form?.fields.map((field) => (
            <Panel key={field._id!} header={getFieldHeader(field)}>
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
      </Spin>
    </div>
  );
});

export default EditorFieldsList;
