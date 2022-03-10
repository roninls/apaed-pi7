import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  donor_id: Yup.string().required(),
  donation_date: Yup.string().required(),
  type: Yup.string().required(),
  active: Yup.boolean().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  donor_id: Yup.string().required(),
  donation_date: Yup.string().required(),
  type: Yup.string().required(),
  active: Yup.boolean().required(),
});
