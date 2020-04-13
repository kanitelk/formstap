import React, { useContext, useState } from "react";
import { Input, Button } from "antd";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../../../stores/formStore";

const Finish: React.FC = observer(() => {
  const store = useContext(FormStoreContext);
  const { form, current_step } = store;
  const [state, setState] = useState("");
  const setAnswer = () => {
    store.setAnswer(state);
  };
  return (
    <>
      {!store.isSubmittedError ? (
        <div className="finish-screen">
          <h1>Thank you!</h1>
          <h3>Your answers have been sent successfully</h3>
          {store.reward?.reward && store.reward.link && (
            <div className="get-push">
              <h3>Tap to get your reward</h3>
              <Button
                onClick={() => window.open(store.reward?.link, "_blank")}
                type="primary"
              >
                Get reward
              </Button>
            </div>
          )}
          {store.reward?.reward && !store.reward.is_auto && (
            <div className="push-info">
              <h3>You will receive a reward after approval.</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="finish-screen">
          <h1>Oops...</h1>
          <h3>Please, try again or contact the author of the form</h3>
        </div>
      )}
    </>
  );
});

export default Finish;
