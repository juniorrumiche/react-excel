import { ProSidebarProvider } from "react-pro-sidebar";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./Routes";

const App = () => {
  return (
    <ProSidebarProvider>
      <RouterProvider router={Routes} />
    </ProSidebarProvider>
  );
};

export default App;
