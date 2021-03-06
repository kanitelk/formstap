import "./FormsList.scss";

import { LinkOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Menu, message, Tag, Spin } from "antd";
import copy from "copy-to-clipboard";
import React, { useEffect, useState, useContext } from "react";

import { getForms, deleteForm } from "../../../services/editorAPI";
import { httpErrorHandler } from "../../../services/utils";
import history from "../../../stores/history";
import { TFormEditor } from "../../Form/types";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../../stores/appStore";

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

const FormsList: React.FC = observer(() => {
  const store = useContext(AppStoreContext)
  const [state, setState] = useState<{
    isLoading: boolean;
    forms: TFormEditor[];
  }>({
    isLoading: false,
    forms: [],
  });
  useEffect(() => {
    let r = async () => {
      setState({ ...state, isLoading: true });
      let forms = await getForms(store.token!);
      forms = forms.sort((a, b) => {
        // @ts-ignore
        return new Date(b.updatedAt!) - new Date(a.updatedAt!);
      });
      setState({ ...state, isLoading: false, forms: forms });
    };
    try {
      r();
    } catch (error) {
      setState({ ...state, isLoading: false });
      httpErrorHandler(error);
    }
  }, [store.isAuth]);

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

  const goToResponces = (id: string) => {
    history.push(`/responces/${id}`);
  };

  return (
    <>
      {state.isLoading ? (
        <Spin />
      ) : (
        <div className="forms-list">
          {state.forms.map((form) => (
            <Card
              className="form-card"
              // cover={<img src={form.img} />}
              key={form._id}
              title={form.title}
            >
              {/* {form.responces} responses */}
              <div className="status">
                {form.responces! > 0 ? (
                  <Tag
                    onClick={() => goToResponces(form._id!)}
                    className="responces"
                  >
                    <strong>{form.responces}</strong> responces
                  </Tag>
                ) : (
                  <Tag
                    onClick={() => goToResponces(form._id!)}
                    className="responces"
                  >
                    No responces
                  </Tag>
                )}
                {form.reward.is_active ? (
                  <Tag color="green">Reward ON</Tag>
                ) : (
                  <Tag color="orange">Reward OFF</Tag>
                )}
              </div>
              <div className="actions">
                <Button onClick={() => history.push(`/edit/${form._id}`)}>
                  Edit
                </Button>
                <div className="actions">
                  <Button
                    onClick={() => copyLink(form._id!)}
                    icon={<LinkOutlined />}
                  />
                  <Dropdown
                    overlay={
                      <CardMenu onDelete={() => deleteForm(form._id!)} form_id={form._id} />
                    }
                    placement="bottomLeft"
                  >
                    <Button icon={<MoreOutlined />} />
                  </Dropdown>
                </div>
              </div>
            </Card>
          ))}
          {state.forms.length === 0 && <h3>You haven't created forms yet</h3>}
        </div>
      )}
    </>
  );
});

export default FormsList;
