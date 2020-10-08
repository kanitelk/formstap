import bodyParser from "body-parser";
import express from "express";

import {
  DecodedTokenType,
  decodeToken,
  getToken,
  isAuthMiddleware,
} from "../actions/Auth";
import { Field } from "../models/FieldSchema";
import { Form, FormDocument } from "../models/FormSchema";
import { HttpException } from "../utils/errorHandler";
import { newForm, postAnswers } from "../actions/Form";
import { Answer } from "../models/AnswerSchema";

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
router.get("/", isAuthMiddleware, async (req, res) => {
  try {
    const user: DecodedTokenType = req.user;
    const countResponces = async (
      form: FormDocument
    ): Promise<FormDocument> => {
      form.responces = await Answer.countDocuments({ form_id: form._id });
      return form;
    };
    let forms = await Form.find({ user_id: user._id });
    const promises = forms.map(countResponces);
    await Promise.all(promises);
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
    if (!form.settings.is_active)
      new HttpException(404, "Form is not active now!");
    res.send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get form by id for EDITOR
router.get("/editor/:id", isAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user: DecodedTokenType = req.user;
    const form = await Form.findById(id).populate("fields");
    if (!form.user_id.equals(user._id))
      new HttpException(401, "You are not owner of this form");
    if (!form) new HttpException(404, "Form not found");
    res.send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get form answers by Form ID
router.get("/answers/:id", isAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user: DecodedTokenType = req.user;
    const form = await Form.findById(id);
    if (!form.user_id.equals(user._id))
      new HttpException(401, "You are not owner of this form");
    if (!form) new HttpException(404, "Form not found");
    const answers = await Answer.find({ form_id: id }).sort({ createdAt: -1 });
    res.send(answers);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create new form
router.post("/", isAuthMiddleware, async (req, res) => {
  try {
    const user: DecodedTokenType = req.user;
    const form = await newForm(user._id);
    res.send(form);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Create new field
router.post("/field", isAuthMiddleware, async (req, res) => {
  try {
    const { type, title, form_id } = req.body;
    const user: DecodedTokenType = req.user;

    if (!type || !form_id)
      throw new HttpException(400, "Some data not provided");

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
});

// Update form settings
router.post("/settings", isAuthMiddleware, async (req, res) => {
  try {
    const {
      data
    } = req.body;
    const user: DecodedTokenType = req.user;
    let form = await Form.findById(data.form_id);
    if (!form.user_id.equals(user._id))
      throw new HttpException(400, "You are not owner of form");
    form.settings = data;
    form.title = data.title;
    await form.save();
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
    
    res.status(400).send(error);
  }
});

// Update form reward settings
router.post("/reward", isAuthMiddleware, async (req, res) => {
  try {
    const { form_id, coin, amount, is_auto, is_active } = req.body;
    const user: DecodedTokenType = req.user;
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
router.delete("/:form_id", isAuthMiddleware, async (req, res) => {
  try {
    const { form_id } = req.params;
    const user: DecodedTokenType = req.user;
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
router.put("/field", isAuthMiddleware, async (req, res) => {
  try {
    const { field_id, field } = req.body;
    const user: DecodedTokenType = req.user;
    let fld = await Field.findById(field_id);
    if (!fld.user_id.equals(user._id))
      throw new HttpException(400, "You are not owner of field");
    // @ts-ignore
    await Field.findByIdAndUpdate(field_id, field);
    await fld.save();
    res.send({ status: "ok" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete field
router.delete("/field/:id", isAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user: DecodedTokenType = req.user;
    let fld = await Field.findById(id);
    if (!fld.user_id.equals(user._id))
      throw new HttpException(400, "You are not owner of field");
    await Field.deleteOne({ _id: id });
    res.send({ status: "ok" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/answer", async (req, res) => {
  const { form_id, answers, user_data } = req.body;
  try {
    let responce = await postAnswers(form_id, answers, user_data);
    res.send(responce);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
