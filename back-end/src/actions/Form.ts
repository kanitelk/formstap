import { Form } from "../models/FormSchema";
import { Minter, TX_TYPE } from "minter-js-sdk";
import { generateWallet, walletFromMnemonic } from "minterjs-wallet";
import config from "../config";

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
