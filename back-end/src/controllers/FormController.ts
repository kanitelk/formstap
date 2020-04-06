import bodyParser from "body-parser";
import express from "express";

import { decodeToken, getToken, isAuthMiddleware } from "../actions/Auth";
import { Form } from "../models/FormSchema";
import { HttpException } from "../utils/errorHandler";
import { Field } from "../models/FieldSchema";
import { Mongoose } from "mongoose";

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

// Get form by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);
    if (!form) new HttpException(404, "Form not found");
    res.send(form);
  } catch (error) {
    throw error;
  }
});

// Create new form
router.post(
  "/",
  (req, res, next) => isAuthMiddleware(req, res, next),
  async (req, res) => {
    try {
      const user = decodeToken(getToken(req));
      const newForm = new Form({ user_id: user._id });
      await newForm.save();
      res.send(newForm);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
);

router.post(
  "/field",
  (req, res, next) => isAuthMiddleware(req, res, next),
  async (req, res) => {
    try {
      const { type } = req.body;
      const user = decodeToken(getToken(req));
      const newField = new Field({ user_id: user._id, type });
      res.send(newField);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
);

router.put(
  "/field",
  (req, res, next) => isAuthMiddleware(req, res, next),
  async (req, res) => {
    try {
      const { field_id, field } = req.body;
      const user = decodeToken(getToken(req));
      let fld = await Field.findById(field_id);
      if (!fld.user_id.equals(user._id))
        throw new HttpException(400, "You are not owner of field");
      fld = field;
      await fld.save();
      res.send(fld);
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
);

router.delete(
  "/field",
  (req, res, next) => isAuthMiddleware(req, res, next),
  async (req, res) => {
    try {
      const { field_id } = req.body;
      const user = decodeToken(getToken(req));
      let fld = await Field.findById(field_id);
      if (!fld.user_id.equals(user._id))
        throw new HttpException(400, "You are not owner of field");
      await Field.deleteOne({ _id: field_id});
      res.send({status: 'ok'});
    } catch (error) {
      throw new HttpException(400, error);
    }
  }
);

export default router;
