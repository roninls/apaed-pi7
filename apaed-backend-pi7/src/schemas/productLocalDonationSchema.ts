import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  donation_id: Yup.string().required(),
  product_id: Yup.string().required(),
  expiration_date: Yup.string(),
  ncm_id: Yup.string().required(),
  food_stamp_id: Yup.string(),
  amount: Yup.number().required(),
  // valor_product: Yup.number().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  donation_id: Yup.string().required(),
  product_id: Yup.string().required(),
  ncm_id: Yup.string().required(),
  active: Yup.boolean().required(),
  // valor_product: Yup.number().required(),
});
