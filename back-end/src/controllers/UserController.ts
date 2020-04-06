import bodyParser from "body-parser";
import express from "express";

import { decodeToken, getToken, isAuthMiddleware } from "../actions/Auth";
import { createUser, editUser, loginUser } from "../actions/User";
import { HttpException } from "../utils/errorHandler";

const router = express.Router();

router.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "30kb",
  }),
  bodyParser.json({
    limit: "10kb",
  })
);

// Create new user
router.post("/", async (req, res) => {
  const { login, password, email } = req.body;
  try {
    res.send(await createUser(login, password, email));
  } catch (error) {
      throw new HttpException(400, error);
  }
});

// Login and get Auth token
router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  try {
    res.send(await loginUser(login, password));
  } catch (error) {
      throw new HttpException(400, error);
  }
});

// Edit user
router.post(
  "/edit",
  (req, res, next) => isAuthMiddleware(req, res, next),
  async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const data = decodeToken(getToken(req));
      res.send(await editUser(data._id, email, password));
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
);

// Get user profile
router.get(
  "/profile",
  (req, res, next) => isAuthMiddleware(req, res, next),
  async (req, res) => {
    try {
      res.send(getToken(req));
    } catch (error) {
      throw new HttpException(400, error)
    }
  }
);

export default router;
