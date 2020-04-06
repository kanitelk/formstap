import {
  FieldDocument,
  FieldValidations,
  FieldProperties,
} from "../FieldSchema";

export type PhoneField = FieldDocument & {
  validations: FieldValidations;
  properties: FieldProperties & PhoneFieldProperties
};

type PhoneFieldProperties = {
  default_country_code?: string;
}

export type InputAnswer = string;