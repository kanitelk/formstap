import "./FormsList.scss";

import { Card, Dropdown, Button, Menu, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";

import { Form, getForms, deleteForm } from "../../../services/editorAPI";
import { httpErrorHandler } from "../../../services/utils";
import history from "../../../stores/history";
import { DownOutlined, MoreOutlined, LinkOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";

const CardMenu: React.FC<any> = ({ form_id, onDelete }: any) => {
  const confirmDelete = async () => {
    try {
      let r = await deleteForm(form_id);
      onDelete();
      message.success("Form deleted!");
    } catch (error) {
      httpErrorHandler(error);
    }
  };
  return (
    <Menu>
      <Menu.Item>
        <span onClick={confirmDelete}>Delete</span>
      </Menu.Item>
    </Menu>
  );
};

const FormsList: React.FC = () => {
  const [state, setState] = useState<{
    isLoading: boolean;
    forms: Form[];
  }>({
    isLoading: false,
    forms: [],
  });
  useEffect(() => {
    let r = async () => {
      setState({ ...state, isLoading: true });
      let forms = await getForms();
      setState({ ...state, isLoading: false, forms: forms });
    };
    try {
      r();
    } catch (error) {
      setState({ ...state, isLoading: false });
      httpErrorHandler(error);
    }
  }, []);

  const deleteForm = (id: string) => {
    setState({
      ...state,
      forms: state.forms.filter((item) => item._id !== id),
    });
  };

  const copyLink = (id: string) => {
    copy(`${window.location.host}/form/${id}`);
    message.success("Link copied");
  };

  return (
    <div className="forms-list">
      {state.forms.map((form) => (
        <Card
          className="form-card"
          // cover={<img src={form.img} />}
          key={form._id}
          title={form.title}
        >
          {/* {form.responces} responses */}
          <div className="actions">
            <Button onClick={() => history.push(`/edit/${form._id}`)}>
              Edit
            </Button>
            <div className="actions">
              <Button
                onClick={() => copyLink(form._id!)}
                icon={<LinkOutlined />}
                style={{ marginRight: "5px" }}
              />
              <Dropdown
                overlay={<CardMenu onDelete={deleteForm} form_id={form._id} />}
                placement="bottomLeft"
              >
                <Button icon={<MoreOutlined />} />
              </Dropdown>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FormsList;
