import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AuthGuard } from "./features/auth-guard";
import { Layout } from "./app/components/layout/layout";
import { Auth } from "./pages/auth";
import { Users } from "./pages/users";
import { City } from "./pages/city";
import { TypeNumber } from "./pages/type-number";
import { HistoriesImport } from "./pages/histories-import";
import { FilterDatabase } from "./pages/filter-database";
import { MainPage } from "./pages/main-page";
import { Result } from "./pages/result";
import { Numbers } from "./pages/numbers";
import { Guest } from "./pages/guest";
import { ResultHistory } from "./pages/result-history";

const container = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/filter-database",
        element: <FilterDatabase />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/city",
        element: <City />,
      },
      {
        path: "/type-number",
        element: <TypeNumber />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/numbers",
        element: <Numbers />,
      },
      {
        path: "/guest",
        element: <Guest />,
      },
      {
        path: "/result-history",
        element: <ResultHistory />,
      },
      {
        path: "/histories-import",
        element: <HistoriesImport />,
      },
    ],
  },
]);

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <MantineProvider>
        <AuthGuard>
          <Notifications />
          <RouterProvider router={router} />
        </AuthGuard>
      </MantineProvider>
    </Provider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
