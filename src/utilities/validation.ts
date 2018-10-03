const Joi = require("joi-browser");

interface KeyValueType {
  key: string;
  value: string;
}

const validateAllFields = (
  fieldsObject: object,
  schema: object,
  mappings = { abortEarly: false }
) => {
  let result: object = Joi.validate(fieldsObject, schema, mappings);
  let errors: KeyValueType[] = [];
  if (result["error"]) {
    result["error"].details.forEach((detail: object) => {
      errors.push({ key: detail["context"].key, value: detail["message"] });
    });
  }
  return errors;
};
const validateField = (
  fieldObject: object,
  schema: object,
  mappings = { abortEarly: true }
) => {
  let result = Joi.validate(fieldObject, schema, mappings);
  let error: KeyValueType | {} = {};
  if (result["error"]) {
    error["key"] = result["error"].details[0].context.key;
    error["value"] = result["error"].details[0].message;
  }
  return error;
};

export default {
  validateAllFields,
  validateField
};
