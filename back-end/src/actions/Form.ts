import axios from "axios";
import { Minter, TX_TYPE } from "minter-js-sdk";
import { generateWallet, walletFromMnemonic } from "minterjs-wallet";

import config from "../config";
import { Answer } from "../models/AnswerSchema";
import { Form } from "../models/FormSchema";
import { HttpException } from "../utils/errorHandler";

const minter = new Minter({ apiType: "node", baseURL: config.nodeURL });

export const generateSeed = () => {
  const wallet = generateWallet();
  return wallet.getMnemonic();
};

export const getAddressFromSeed = (seed: string): string => {
  let wallet;
  try {
    wallet = walletFromMnemonic(seed);
    return wallet.getAddressString();
  } catch (error) {
    throw "invalid seed";
  }
};

export const newForm = async (user_id: string) => {
  const seed = generateSeed();
  const form = new Form({
    user_id,
    reward: {
      address: getAddressFromSeed(seed),
      seed,
      coin: "BIP",
      amount: 1,
      is_auto: true,
    },
  });
  await form.save();
  return form;
};

export const payToWallet = async (
  toAddress: string,
  seed: string,
  coin: string = "BIP",
  amount: number = 1
) => {
  const wallet = walletFromMnemonic(seed);
  const privateKey = wallet.getPrivateKeyString();

  const txParams = {
    chainId: config.chainId,
    type: TX_TYPE.SEND,
    data: {
      to: toAddress,
      value: amount,
      coin,
    },
    gasCoin: coin,
  };

  try {
    let res = await minter.postTx(txParams, {
      privateKey: privateKey,
      gasRetryLimit: 2,
    });
    return res;
  } catch (error) {
    console.log(error?.response?.data?.error?.tx_result?.message);
    throw error;
  }
};

export const postAnswers = async (
  form_id: string,
  answers: any[],
  user_data: { figerprint?: string }
) => {
  const form = await Form.findById(form_id);
  if (!form) throw new HttpException(404, "Form not found");

  if (form.settings.check_fingerprint) {
    const fp = user_data.figerprint;
    if (user_data.figerprint) {
      const answers = await Answer.findOne(
        { form_id },
        user_data.figerprint === fp
      );
      if (answers) {
        return {
          reward: false,
          message: "looks like you filled out the form before",
        };
      }
    } else {
      return {
        reward: false,
        message: "looks like you filled out the form before",
      };
    }
  }

  if (form.reward.is_active && form.reward.is_auto) {
    let push = await axios.post(`https://api.tap.mn/api/new`);
    try {
      let hash = await payToWallet(
        push.data.address,
        form.reward.seed,
        form.reward.coin,
        form.reward.amount
      );
      let answer = new Answer({
        form_id,
        answers,
        user_data,
        reward: {
          coin: form.reward.coin,
          amount: form.reward.amount,
          link: `https://tap.mn/` + push.data.link,
          hash: hash,
          status: "success",
        },
      });
      await answer.save();
      return {
        reward: true,
        is_auto: true,
        link: `https://tap.mn/` + push.data.link,
      };
    } catch (error) {
      let answer = new Answer({
        form_id,
        answers,
        user_data,
        reward: {
          coin: form.reward.coin,
          amount: form.reward.amount,
          link: `https://tap.mn/` + push.data.link,
          status: "error",
        },
      });
      await answer.save();
      return {
        reward: false,
        is_auto: false,
      };
    }
  }

  let answer = new Answer({
    form_id,
    answers,
    user_data,
    reward: {
      status: "wait",
    },
  });
  await answer.save();

  if (form.reward.is_active) {
    return {
      reward: true,
      is_auto: false,
    };
  }

  return {
    reward: false,
    is_auto: false,
  };
};
