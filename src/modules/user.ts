import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from "typesafe-actions";
import produce from "immer";
import { AxiosError } from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { check } from "../lib/api/auth";

const TEMP_SET_USER = "user/TEMP_SET_USER";

const CHECK = "user/CHECK";
const CHECK_SUCCESS = "user/CHECK_SUCCESS";
const CHECK_FAILURE = "user/CHECK_FAILURE";

const LOGOUT = "user/LOGOUT";

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user)<any>();
export const checkUserAsync = createAsyncAction(
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE
)<undefined, any, AxiosError>();
export const logout = createAction(LOGOUT)();

export type UserActions = ActionType<
  typeof tempSetUser | typeof checkUserAsync | typeof logout
>;

interface UserState {
  user: any;
  checkError: any;
  loading: null | boolean;
}

const initialState: UserState = {
  user: null,
  checkError: null,
  loading: null,
};

function* checkUserSaga(action: ReturnType<typeof checkUserAsync.request>) {
  try {
    const response = yield call(check);
    yield put({
      type: CHECK_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: CHECK_FAILURE,
      payload: error,
      error: true,
    });
  }
}

function* logoutSaga() {
  try {
    yield call(logout); // logout API호출
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
}

function checkFailureSaga() {
  try {
    localStorage.removeItem("user"); // localStorage에서 user를 제거
  } catch (e) {
    console.log("localStorage is not working");
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkUserSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const user = createReducer<UserState, UserActions>(initialState, {
  [TEMP_SET_USER]: (state, { payload: user }) => ({
    ...state,
    user,
  }),
  [CHECK]: (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    }),
  [CHECK_SUCCESS]: (state, { payload: user }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.user = user;
      draft.checkError = null;
    }),
  [CHECK_FAILURE]: (state, { payload: error }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.checkError = error;
    }),
  [LOGOUT]: (state) => ({
    ...state,
    user: null,
  }),
});

export default user;
