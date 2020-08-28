import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules";
import Header from "./Header";
import { logout } from "../../modules/user";
function HeaderContainer() {
  const { user } = useSelector(({ user }: RootState) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogout={onLogout} />;
}

export default HeaderContainer;
