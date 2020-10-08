import express from "express";
import * as jwt from "jsonwebtoken";
import { createHash, createHmac } from "crypto";

import config from "../config";
import { HttpException } from "../utils/errorHandler";
import { sha256 } from "js-sha256";
import { User } from "../models/UserSchema";

export type DecodedTokenType = {
  _id?: string;
  login?: string;
};

export type TgAuthData = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
};

export const getToken = (req: express.Request): string =>
  req.headers.authorization.split(" ")[1];

export const generateToken = (_id: string, login: string) => {
  return jwt.sign({ _id, login }, config.tokenSecret, {
    expiresIn: config.tokenExpiration,
  });
};

export const decodeToken = (token: string): DecodedTokenType => {
  return jwt.verify(token, config.tokenSecret) as DecodedTokenType;
};

export const isAuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = getToken(req);
    if (!token || token.length === 0)
      throw new HttpException(401, `Auth error: JWT not provided`);
    jwt.verify(token, config.tokenSecret, (err, decoded) => {
      req.user = decoded;
      if (err) throw new HttpException(401, `Auth error: ${err.message}`);
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

export const tgAuth = async (data: TgAuthData) => {
  const secret = createHash("sha256").update(config.tgBotSecret).digest();

  // @ts-ignore
  function checkSignature({ hash, ...data }) {
    const checkString = Object.keys(data)
      .sort()
      .map((k) => `${k}=${data[k]}`)
      .join("\n");
    const hmac = createHmac("sha256", secret).update(checkString).digest("hex");
    return hmac === hash;
  }

  if (checkSignature(data)) {
    let user = await User.findOne({ "telegram.id": data.id });
    if (user) {
      user.telegram = data;
      await user.save();
    }
    if (!user) {
      user = new User({ telegram: data });
      await user.save();
    }
    const token = generateToken(user._id, data.username);
    return {
      token,
      data,
    };
  } else {
    throw new HttpException(401, "Data not from Telegram!");
  }
};
