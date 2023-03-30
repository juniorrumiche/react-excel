import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { ReactSession } from "react-client-session";
import { setUser } from "../redux/slices/user/slices";

interface Props {
  children?: ReactNode | ReactElement;
  redirecTo?: string;
}
export const ProtectedRoutes = ({ children, redirecTo = "/login" }: Props) => {
  const state = useSelector((state: RootState) => state.UserSlice);
  const dispatch = useDispatch();
  // console.log(
  //   !!state.user.token && !!state.user.user_id && !!state.user.username
  // );
  //
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("definiendo usuario");
      dispatch(
        setUser({
          user_id: ReactSession.get("user_id") || undefined,
          username: ReactSession.get("username") || undefined,
          token: ReactSession.get("token") || undefined,
        })
      );
    }, 10000);
    return () => clearTimeout(timeout);
  });
  return !!state.user.token && !!state.user.user_id && !!state.user.username ? (
    <>{children}</>
  ) : (
    <Navigate to={redirecTo} />
  );
};
