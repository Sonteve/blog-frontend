import produce from "immer";
import { createAction, createReducer, ActionType } from "typesafe-actions";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

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
}
const initialState: AuthState = {};

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
