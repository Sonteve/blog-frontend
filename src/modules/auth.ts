import produce from "immer";
import {
  createAction,
  createReducer,
  ActionType,
  createAsyncAction,
} from "typesafe-actions";
import { takeLatest, call, put } from "redux-saga/effects";
import { login, register, check, Auth } from "../lib/api/auth";
import { AxiosError } from "axios";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const REGISTER = "auth/REGISTER";
const REGISTER_SUCCESS = "auth/REGISTER_SUCCESS";
const REGISTER_FAILURE = "auth/REGISTER_FAILURE";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";

export const registerAsync = createAsyncAction(
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
)<Auth, any, AxiosError>();

export const loginAsync = createAsyncAction(
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<Auth, any, AxiosError>();

function* registerSaga(action: ReturnType<typeof registerAsync.request>) {
  try {
    const response = yield call(register, action.payload);
    yield put({
      type: REGISTER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      payload: error,
      error: true,
    });
  }
}

function* loginSaga(action: ReturnType<typeof loginAsync.request>) {
  try {
    const response = yield call(login, action.payload);
    yield put({
      type: LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      payload: error,
      error: true,
    });
  }
}

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

interface ChangeField {
  form: string;
  key: string;
  value: any;
}

export interface AuthData {
  data: {
    _id: string;
    username: string;
    __v: number;
  };
  status: number;
  statusText: string;
}
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }: ChangeField) => ({
    form,
    key,
    value,
  })
)<ChangeField>();

export const initializeForm = createAction(
  INITIALIZE_FORM,
  (form: string) => form
)<string>();

type AuthActions = ActionType<
  | typeof changeField
  | typeof initializeForm
  | typeof registerAsync
  | typeof loginAsync
>;

interface AuthState {
  [keyProps: string]: any;
  login: {
    username: string;
    password: string;
    loading: null | boolean;
  };
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
    loading: null | boolean;
  };
  auth: null | AuthData;
  authError: null | AxiosError;
}
const initialState: AuthState = {
  login: {
    username: "",
    password: "",
    loading: null,
  },
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
    loading: null,
  },
  auth: null,
  authError: null,
};

const auth = createReducer<AuthState, AuthActions>(initialState, {
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, (draft) => {
      draft[form][key] = value;
    }),
  [INITIALIZE_FORM]: (state, { payload: form }) => ({
    ...initialState,
    [form]: initialState[form],
    authError: null,
  }),
  [REGISTER]: (state) =>
    produce(state, (draft) => {
      draft.register.loading = true;
    }),
  [REGISTER_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.register.loading = false;
      draft.authError = null;
      draft.auth = payload;
    }),
  [REGISTER_FAILURE]: (state, { payload: error }) =>
    produce(state, (draft) => {
      draft.register.loading = false;
      draft.authError = error;
    }),
  [LOGIN]: (state) =>
    produce(state, (draft) => {
      draft.login.loading = true;
    }),
  [LOGIN_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.login.loading = false;
      draft.authError = null;
      draft.auth = payload;
    }),
  [LOGIN_FAILURE]: (state, { payload: error }) =>
    produce(state, (draft) => {
      draft.login.loading = false;
      draft.authError = error;
    }),
});

export default auth;
