import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  type: Yup.string().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  type: Yup.string().required(),
});
