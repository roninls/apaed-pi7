import * as Yup from 'yup';

export const cadastroSchema = Yup.object().shape({
  public_place: Yup.string().required(),
  complement: Yup.string().required(),
  number: Yup.string().required(),
  district: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  country: Yup.string().required(),
  zip_code: Yup.string().required(),
  phone: Yup.string().required(),
});

export const updateSchema = Yup.object().shape({
  id: Yup.string().required(),
  public_place: Yup.string().required(),
  complement: Yup.string().required(),
  number: Yup.string().required(),
  district: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  country: Yup.string().required(),
  zip_code: Yup.string().required(),
  phone: Yup.string().required(),
});
