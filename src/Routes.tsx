import { createBrowserRouter } from "react-router-dom";
import { Main } from "./components/Main";
import { NotFoundPage } from "./pages/404";
import { Dashboard } from "./pages/DashBoard";
import { ErrorBoundary } from "./pages/ErrorBoundary";
import { Login } from "./pages/Login";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";
import { RegionDataPage } from "./pages/RegionDataPage";
import { Upload } from "./pages/Upload";

/*
 * ==========================================================================
 * conso
 * */
export const Routes = createBrowserRouter([
  /*
   * ==========================================================================
   * conso
   * */
  {
    path: "/",
    element: <div>esto es el index</div>,
  },

  /*
   * ==========================================================================
   * conso
   * */

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    errorElement: <ErrorBoundary />,
  },
  /*
   * ==========================================================================
   * conso
   * */
  {
    path: "/login",
    element: <Login />,
  },

  /*
   * ==========================================================================
   * conso
   * */

  {
    path: "/admin/excel/upload",
    element: (
      <ProtectedRoutes>
        <Upload />
      </ProtectedRoutes>
    ),

    errorElement: <ErrorBoundary />,
  },

  /*
   * ==========================================================================
   * conso
   * */

  /*
   * ==========================================================================
   * conso
   * */

  {
    path: "/admin/excel/:region",
    element: (
      <ProtectedRoutes>
        <RegionDataPage />
      </ProtectedRoutes>
    ),

    errorElement: <ErrorBoundary />,
  },

  /*
   * ==========================================================================
   * conso
   * */

  {
    path: "/admin/users",
    element: (
      <ProtectedRoutes>
        <Main>cuenta de usuarios</Main>
      </ProtectedRoutes>
    ),

    errorElement: <ErrorBoundary />,
  },

  /*
   * ==========================================================================
   * conso
   * */

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
