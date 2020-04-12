import bodyParser from "body-parser";
import express from "express";

import { decodeToken, getToken, isAuthMiddleware } from "../actions/Auth";
import { Field } from "../models/FieldSchema";
import { Form } from "../models/FormSchema";
import { HttpException } from "../utils/errorHandler";
import { newForm } from "../actions/Form";

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

// Get user forms
router.get("/", async (req, res) => {
  try {
    const user = decodeToken(getToken(req));
    let forms = await Form.find({ user_id: user._id });
    res.send(forms);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get form by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id).populate("fields");
    if (!form) new HttpException(404, "Form not found");
    form.settings = null;
    form.reward = null;
    res.send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get form by id for EDITOR
router.get("/editor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = decodeToken(getToken(req));
    const form = await Form.findById(id).populate("fields");
    if (!form.user_id.equals(user._id))
      new HttpException(401, "You are not owner of rhis form");
    if (!form) new HttpException(404, "Form not found");
    res.send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create new form
router.post("/", async (req, res) => {
  try {
    const user = decodeToken(getToken(req));
    const form = await newForm(user._id);
    res.send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create new field
router.post(
  "/field",
  (req, res, next) => isAuthMiddleware(req, res, next),
  async (req, res) => {
    try {
      const { type, title, form_id } = req.body;
      if (!type || !form_id)
        throw new HttpException(400, "Some data not provided");
      const user = decodeToken(getToken(req));
      let form = await Form.findById(form_id);
      if (!form.user_id.equals(user._id))
        throw new HttpException(400, "Unathorised for this form");
      const newField = new Field({ user_id: user._id, type, title });
      await newField.save();
      form.fields.push(newField._id);
      await form.save();
      res.send(newField);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Update form settings
router.post("/settings", async (req, res) => {
  try {
    const { form_id, title, is_active, notifications } = req.body;
    const user = decodeToken(getToken(req));
    let form = await Form.findById(form_id);
    if (!form.user_id.equals(user._id))
      throw new HttpException(400, "You are not owner of form");
    form.settings.is_active = is_active;
    form.settings.notifications = notifications;
    form.title = title;
    await form.save();
    res.send({ status: "ok" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update form reward settings
router.post("/reward", async (req, res) => {
  try {
    const { form_id, coin, amount, is_auto, is_active } = req.body;
    const user = decodeToken(getToken(req));
    let form = await Form.findById(form_id);
    if (!form.user_id.equals(user._id))
      throw new HttpException(400, "You are not owner of form");
    form.reward.coin = coin;
    form.reward.amount = amount;
    form.reward.is_active = is_active;
    form.reward.is_auto = is_auto;
    await form.save();
    res.send({ status: "ok" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete form
router.delete("/:form_id", async (req, res) => {
  try {
    const { form_id } = req.params;
    const user = decodeToken(getToken(req));
    let form = await Form.findById(form_id);
    if (form.user_id.equals(user._id)) {
      await Form.findByIdAndDelete(form_id);
      res.send({ status: "ok" });
    } else {
      throw new HttpException(401, "This is not your form");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update field
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
      res.status(400).send(error);
    }
  }
);

// Delete field
router.delete(
  "/field/:id",
  (req, res, next) => isAuthMiddleware(req, res, next),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = decodeToken(getToken(req));
      let fld = await Field.findById(id);
      if (!fld.user_id.equals(user._id))
        throw new HttpException(400, "You are not owner of field");
      await Field.deleteOne({ _id: id });
      res.send({ status: "ok" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;
