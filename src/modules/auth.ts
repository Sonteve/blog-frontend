import produce from "immer";
import {
  createAction,
  createReducer,
  ActionType,
  createAsyncAction,
} from "typesafe-actions";
import { takeLatest } from "redux-saga/effects";
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

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

interface ChangeField {
  form: string;
  key: string;
  value: any;
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

type AuthActions = ActionType<typeof changeField | typeof initializeForm>;

interface AuthState {
  [keyProps: string]: any;
  login: {
    username: string;
    password: string;
  };
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
}
const initialState: AuthState = {
  login: {
    username: "",
    password: "",
  },
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
};

const auth = createReducer<AuthState, AuthActions>(initialState, {
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, (draft) => {
      if (form === "") {
        draft[key] = value;
      } else {
        draft[form][key] = value;
      }
    }),
  [INITIALIZE_FORM]: (state) => ({
    ...initialState,
  }),
});

export default auth;
