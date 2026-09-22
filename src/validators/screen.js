const yup = require('yup');

const brightnessSchema = yup
  .number()
  .strict()
  .min(0, 'Brightness cannot be less than 0')
  .max(100, 'Brightness cannot be greater than 100');

const mirrorModeSchema = yup
  .number()
  .strict()
  .typeError('Mirror mode must be a number')
  .oneOf([0, 1], 'Mirror mode must be 0 or 1');

const hourModeSchema = yup
  .number()
  .strict()
  .typeError('Hour mode must be a number')
  .oneOf([0, 1], 'Hour mode must be 0 or 1');

const longitudeSchema = yup
  .number()
  .strict()
  .required('Longitude is required')
  .min(-180, 'Longitude must be between -180 and 180')
  .max(180, 'Longitude must be between -180 and 180');

const latitudeSchema = yup
  .number()
  .strict()
  .required('Latitude is required')
  .min(-90, 'Latitude must be between -90 and 90')
  .max(90, 'Latitude must be between -90 and 90');

module.exports = {
  brightnessSchema,
  mirrorModeSchema,
  hourModeSchema,
  longitudeSchema,
  latitudeSchema,
};
