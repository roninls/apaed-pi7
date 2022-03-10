import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  product_id: Yup.string().required(),
  price: Yup.number().required(),
  sold: Yup.boolean().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  product_id: Yup.string().required(),
  price: Yup.number().required(),
  sold: Yup.boolean().required(),
  active: Yup.boolean().required(),
});
