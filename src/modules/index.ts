import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import user, { userSaga } from "./user";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  auth,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;
