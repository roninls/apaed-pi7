import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  name: Yup.string().required(),
  brand: Yup.string().required(),
  ncm_id: Yup.string().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  brand: Yup.string().required(),
  ncm_id: Yup.string().required(),
  active: Yup.boolean().required(),
});
