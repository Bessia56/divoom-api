const yup = require('yup');

const showTextSchema = yup.object({
  text: yup.string().strict().required('Text is required'),
  x: yup.number().strict().required('X is required'),
  y: yup.number().strict().required('Y is required'),
  width: yup.number().strict().required('Width is required'),
  height: yup.number().strict().required('Height is required'),
  align: yup
    .number()
    .strict()
    .oneOf([0, 1, 2], 'Align must be 0, 1 or 2')
    .required('Align is required'),
  fontSize: yup.number().strict().required('Font size is required'),
  fontId: yup.number().strict().required('Font ID is required'),
  fontColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Font color must be a HEX color')
    .required('Font color is required'),

  bgColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a HEX color')
    .required('Background color is required'),
});

const showImageSchema = yup.object({
  url: yup.string().strict().required('Image URL is required'),
  x: yup.number().strict().required('X is required'),
  y: yup.number().strict().required('Y is required'),
  width: yup.number().strict().required('Width is required'),
  height: yup.number().strict().required('Height is required'),
});

const showTimeSchema = yup.object({
  x: yup.number().strict().required('X is required'),
  y: yup.number().strict().required('Y is required'),
  width: yup.number().strict().required('Width is required'),
  height: yup.number().strict().required('Height is required'),
  align: yup
    .number()
    .strict()
    .oneOf([0, 1, 2], 'Align must be 0, 1 or 2')
    .required('Align is required'),
  fontSize: yup.number().strict().required('Font size is required'),
  fontId: yup.number().strict().required('Font ID is required'),
  fontColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Font color must be a HEX color')
    .required('Font color is required'),
  bgColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a HEX color')
    .required('Background color is required'),
});

const showMdaySchema = yup.object({
  x: yup.number().strict().required('X is required'),
  y: yup.number().strict().required('Y is required'),
  width: yup.number().strict().required('Width is required'),
  height: yup.number().strict().required('Height is required'),
  align: yup
    .number()
    .strict()
    .oneOf([0, 1, 2], 'Align must be 0, 1 or 2')
    .required('Align is required'),
  fontSize: yup.number().strict().required('Font size is required'),
  fontId: yup.number().strict().required('Font ID is required'),
  fontColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Font color must be a HEX color')
    .required('Font color is required'),
  bgColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a HEX color')
    .required('Background color is required'),
});

const showMonYearSchema = yup.object({
  x: yup.number().strict().required('X is required'),
  y: yup.number().strict().required('Y is required'),
  width: yup.number().strict().required('Width is required'),
  height: yup.number().strict().required('Height is required'),
  align: yup
    .number()
    .strict()
    .oneOf([0, 1, 2], 'Align must be 0, 1 or 2')
    .required('Align is required'),
  fontSize: yup.number().strict().required('Font size is required'),
  fontId: yup.number().strict().required('Font ID is required'),
  fontColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Font color must be a HEX color')
    .required('Font color is required'),
  bgColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a HEX color')
    .required('Background color is required'),
});

const showWeekSchema = yup.object({
  x: yup.number().strict().required('X is required'),
  y: yup.number().strict().required('Y is required'),
  width: yup.number().strict().required('Width is required'),
  height: yup.number().strict().required('Height is required'),
  align: yup
    .number()
    .strict()
    .oneOf([0, 1, 2], 'Align must be 0, 1 or 2')
    .required('Align is required'),
  fontSize: yup.number().strict().required('Font size is required'),
  fontId: yup.number().strict().required('Font ID is required'),
  fontColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Font color must be a HEX color')
    .required('Font color is required'),
  bgColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a HEX color')
    .required('Background color is required'),
});

const showTemperatureSchema = yup.object({
  x: yup.number().strict().required('X is required'),
  y: yup.number().strict().required('Y is required'),
  width: yup.number().strict().required('Width is required'),
  height: yup.number().strict().required('Height is required'),
  align: yup
    .number()
    .strict()
    .oneOf([0, 1, 2], 'Align must be 0, 1 or 2')
    .required('Align is required'),
  fontSize: yup.number().strict().required('Font size is required'),
  fontId: yup.number().strict().required('Font ID is required'),
  fontColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Font color must be a HEX color')
    .required('Font color is required'),
  bgColor: yup
    .string()
    .strict()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a HEX color')
    .required('Background color is required'),
});

module.exports = {
  showTextSchema,
  showImageSchema,
  showTimeSchema,
  showMdaySchema,
  showMonYearSchema,
  showWeekSchema,
  showTemperatureSchema,
};
