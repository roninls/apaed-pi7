import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  description: Yup.string().required(),
  ncm_code: Yup.string().required(),
  long_description: Yup.string().required(),
  type_id: Yup.string().required(),
  unity_measurement_id: Yup.string().required(),
  minimal_more_products: Yup.number().required(),
  minimal_qntt: Yup.string().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  description: Yup.string().required(),
  ncm_code: Yup.string().required(),
  long_description: Yup.string().required(),
  type_id: Yup.string().required(),
  unity_measurement_id: Yup.string().required(),
  minimal_more_products: Yup.number().required(),
  minimal_qntt: Yup.string().required(),
  active: Yup.boolean().required(),
});
