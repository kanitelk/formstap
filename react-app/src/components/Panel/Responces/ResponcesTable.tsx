import "./ResponcesTable.scss";

import { message, Table, Tag } from "antd";
import copy from "copy-to-clipboard";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";

import { ResponcesStoreContext } from "../../../stores/responcesStore";
import { Answer, RewardResponce } from "../../Form/types";

const { Column, ColumnGroup } = Table;

const copyPushLink = (link: string) => {
  copy(link);
  message.success("Push link copied!");
};

const ResponcesTable: React.FC = observer(() => {
  const store = useContext(ResponcesStoreContext);

  return (
    <div className="responces-table-container">
      <Table
        className="responces-table"
        size="small"
        bordered
        rowKey={(e) => e._id}
        dataSource={store.responces!}
        rowClassName="row"
        tableLayout="auto"
      >
        <Column
          dataIndex="createdAt"
          title="Date"
          render={(item) => {
            let d = new Date(item);
            return d.toLocaleString();
          }}
        />
        <Column
          dataIndex="reward"
          title="Reward"
          render={(reward: RewardResponce) => {
            return (
              <div className="reward-cell">
                {reward.status === "wait" && <Tag>Wait</Tag>}
                {reward.status === "success" && (
                  <Tag onClick={() => copyPushLink(reward.link!)} color="green">
                    {reward.amount} {reward.coin}
                  </Tag>
                )}
                {reward.status === "error" && <Tag color="red">Error</Tag>}
              </div>
            );
          }}
        />
        <Column dataIndex={["user_data", "ip_data", "query"]} title="IP" />
        <Column dataIndex={["user_data", "ip_data", "city"]} title="City" />
        <Column
          dataIndex={["user_data", "ip_data", "proxy"]}
          title="Proxy"
          render={(val) => {
            if (val === false) return <Tag color="green">Clear IP</Tag>;
            if (val === true) return <Tag color="red">Black IP</Tag>;
          }}
        />
        <Column
          dataIndex={["user_data", "fingerprint"]}
          title="Fingerprint"
          ellipsis
        />
        {store.form?.fields!.length >= 1 && (
          <ColumnGroup className="answers" title="Answers">
            {store.form!.fields.map((field) => (
              <Column
                dataIndex={["answers"]}
                title={field.title || field.type}
                key={field._id}
                render={(answers) => {
                  let ans = answers.find(
                    (item: Answer) => item.field_id === field._id
                  );
                  if (ans) {
                    return ans.answer;
                  } else return null;
                }}
              />
            ))}
          </ColumnGroup>
        )}
      </Table>
    </div>
  );
});

export default ResponcesTable;
