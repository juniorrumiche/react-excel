import { ReactElement, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface Props {
  children?: ReactNode | ReactElement;
  redirecTo?: string;
}
export const ProtectedRoutes = ({ children, redirecTo = "/login" }: Props) => {
  const state = useSelector((state: RootState) => state.UserSlice);
  return !state.user?.token ? <Navigate to={redirecTo} /> : <>{children}</>;
};
