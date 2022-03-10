import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const cadastroSchema = Yup.object().shape({
  destiny_id: Yup.string().required(),
  product_id: Yup.string().required(),
  description: Yup.string().required(),
  total_amount_transfered: Yup.string().required(),
  product_name: Yup.string().required(),
  product_brand: Yup.string().required(),
  product_ncm_code: Yup.string().required(),
  active: Yup.boolean().required(),
});

export const cadastroFoodStampSchema = Yup.object().shape({
  product_id: Yup.string().required(),
  active: Yup.boolean().required(),
  total_amount_transfered: Yup.string().required(),
  food_stamp_id: Yup.string().required(),
});
