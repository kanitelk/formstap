import express from "express";
import * as jwt from "jsonwebtoken";

import config from "../config";
import { HttpException } from "../utils/errorHandler";

export type DecodedTokenType = {
  _id?: string;
  login?: string;
};

export const getToken = (req: express.Request): string =>
  req.headers.authorization.split(" ")[1];

export const generateToken = (_id: string, login: string) => {
  const data = {
    _id,
    login,
  };
  return jwt.sign(data, config.tokenSecret, {
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
    const decodedToken = jwt.verify(token, config.tokenSecret, (err) => {
      if (err) throw new HttpException(401, `Auth error: ${err.message}`);
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
