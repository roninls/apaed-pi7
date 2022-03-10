import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  name: Yup.string().required(),
  type: Yup.string().required(),
  open: Yup.boolean().required(),
  active: Yup.boolean().required(),
  delivered: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  type: Yup.string().required(),
  open: Yup.boolean().required(),
  active: Yup.boolean().required(),
  delivered: Yup.boolean().required(),
});
