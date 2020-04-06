import {
  FieldDocument,
  FieldValidations,
  FieldProperties,
} from "../FieldSchema";

export type DropdownField = FieldDocument & {
  validations: FieldValidations;
  properties: FieldProperties & DropdownFieldProperties;
};

type DropdownFieldProperties = {
  choices: Array<{
    label: string;
  }>;
};

export type DropdownAnswer = string;