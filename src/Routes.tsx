import { createBrowserRouter } from "react-router-dom";
import { Main } from "./components/Main";
import { NotFoundPage } from "./pages/404";
import { Dashboard } from "./pages/DashBoard";
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
    element: (
      <ProtectedRoutes>
        <Main />
      </ProtectedRoutes>
    ),
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
