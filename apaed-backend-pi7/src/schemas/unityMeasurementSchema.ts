import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  unity_measurement: Yup.string().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  unity_measurement: Yup.string().required(),
});
