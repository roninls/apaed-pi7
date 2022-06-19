import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import APIUrl from '../../config/api';
import { IBazar, IProductLocalDonationGet, IProductLocalDonationPostPut } from '../model/productLocalDonation.model';

export const ACTION_TYPES = {
  GET_BAZAR: 'bazar/GET_BAZAR',
  GET_BAZAR_BY_FOODSTAMP_ID: 'bazar/GET_BAZAR_BY_FOODSTAMP_ID',
  EDIT_PRODUCT: 'bazar/EDIT_PRODUCT',
  REGISTER_NEW_PRODUCT_TO_BAZAR: 'bazar/REGISTER_NEW_PRODUCT_TO_BAZAR',
  RESET_REGISTER: 'bazar/RESET_REGISTER',
  RESET: 'bazar/RESET',
  UPDATE_PRODUCT_LOCAL_DONATION: 'bazar/UPDATE_PRODUCT_LOCAL_DONATION',
};

const initialState = {
  loading: false,
  bazarByFoodStampIdSuccess: false,
  bazarByFoodStampIdError: false,
  getBazarSuccess: false,
  getBazarError: false,
  registerNewProductToBazarSuccess: false,
  registerNewProductToBazarError: false,
  bazar: [] as Array<IBazar>,
  bazarByFoodStampId: [] as Array<any>,
  toEditProduct: {} as IBazar,
  totalCount: 0,
  totalCountByFoodStampId: 0,
  updateBazarSuccess: false,
  updateBazarError: false,
};

export type BazarState = Readonly<typeof initialState>;

// Reducer

export default (state: BazarState = initialState, action): BazarState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_BAZAR):
    case REQUEST(ACTION_TYPES.GET_BAZAR_BY_FOODSTAMP_ID):
    case REQUEST(ACTION_TYPES.REGISTER_NEW_PRODUCT_TO_BAZAR):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCT_LOCAL_DONATION):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GET_BAZAR):
      return {
        ...initialState,
        loading: false,
        getBazarError: true,
        getBazarSuccess: false,
      };
    case FAILURE(ACTION_TYPES.GET_BAZAR_BY_FOODSTAMP_ID):
      return {
        ...initialState,
        loading: false,
        bazarByFoodStampIdError: true,
        bazarByFoodStampIdSuccess: false,
      };
    case FAILURE(ACTION_TYPES.REGISTER_NEW_PRODUCT_TO_BAZAR):
      return {
        ...initialState,
        loading: false,
        registerNewProductToBazarError: true,
        registerNewProductToBazarSuccess: false,
      };
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCT_LOCAL_DONATION):
      return {
        ...state,
        loading: false,
        updateBazarSuccess: false,
        updateBazarError: true,
      };
    case SUCCESS(ACTION_TYPES.REGISTER_NEW_PRODUCT_TO_BAZAR):
      return {
        ...state,
        loading: false,
        registerNewProductToBazarError: false,
        registerNewProductToBazarSuccess: true,
      };
    case SUCCESS(ACTION_TYPES.GET_BAZAR):
      return {
        ...state,
        loading: false,
        getBazarError: false,
        getBazarSuccess: true,
        bazar: [...action.payload.data[0]],
        totalCount: action.payload.data[1],
      };
    case SUCCESS(ACTION_TYPES.GET_BAZAR_BY_FOODSTAMP_ID):
      return {
        ...state,
        loading: false,
        bazarByFoodStampIdError: false,
        bazarByFoodStampIdSuccess: true,
        bazarByFoodStampId: [...action.payload.data[0]],
        totalCountByFoodStampId: action.payload.data[1],
      };
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCT_LOCAL_DONATION):
      return {
        ...state,
        loading: false,
        updateBazarSuccess: true,
        updateBazarError: false,
      };
    case ACTION_TYPES.EDIT_PRODUCT:
      return {
        ...state,
        toEditProduct: action.payload,
      };
    case ACTION_TYPES.RESET_REGISTER:
      return {
        ...state,
        registerNewProductToBazarSuccess: false,
        registerNewProductToBazarError: false,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const getBazar = (skip: number, take: number) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_BAZAR,
    payload: APIUrl.get(`bazar?skip=${skip}&take=${take}`),
  });
};

export const getBazarByFoodStampId = (id: string, skip: number, take: number) => async (dispatch) => {
  console.log(id);
  await dispatch({
    type: ACTION_TYPES.GET_BAZAR_BY_FOODSTAMP_ID,
    payload: APIUrl.get(`bazar/foodStamp/${id}?skip=${skip}&take=${take}`),
  });
};

export const registerNewProductToBazar = (product: IProductLocalDonationPostPut) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.REGISTER_NEW_PRODUCT_TO_BAZAR,
    payload: APIUrl.post('bazar', product),
  });
};

export const setProductToEdit = (product: IProductLocalDonationGet) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.EDIT_PRODUCT,
    payload: product,
  });
};

export const updateProduct = (foodStampId: string, product: IProductLocalDonationPostPut) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCT_LOCAL_DONATION,
    payload: APIUrl.put('bazar', product),
  });
  dispatch(getBazarByFoodStampId(foodStampId, 0, 10));
};

export const resetSuccessRegister = () => ({
  type: ACTION_TYPES.RESET_REGISTER,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
