import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { AuthGuard } from './features/authGuard'
import { Layout } from './app/components/layout/layout';

import { Auth } from './pages/auth';
import { Registration } from './pages/registration';
import { City } from './pages/city';
import { TypeNumber } from './pages/type-number';
import { Result } from './pages/result';
import { AddNumbers } from './pages/add-numbers';
import { AddGuest } from './pages/add-guest';
import { AddResultHistory } from './pages/add-result-history';
import { HistoriesDelete } from './pages/histories-delete';
import { HistoriesImport } from './pages/histories-import';
import { FilterDatabase } from './pages/filter-database';
import { MainPage } from './pages/main-page';

const container = document.getElementById("root")
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />
      },
      {
        path: "/filter-database",
        element: <FilterDatabase />
      },
      {
        path: "/registration",
        element: <Registration />
      },
      {
        path: "/city",
        element: <City />
      },
      {
        path: "/type-number",
        element: <TypeNumber />
      },
      {
        path: "/result",
        element: <Result />
      },
      {
        path: "/add-numbers",
        element: <AddNumbers />
      },
      {
        path: "/add-guest",
        element: <AddGuest />
      },
      {
        path: "/add-result-history",
        element: <AddResultHistory />
      },
      {
        path: "/histories-delete",
        element: <HistoriesDelete />
      },
      {
        path: "/histories-import",
        element: <HistoriesImport />
      },
    ],
  },
])


if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <MantineProvider >
        <AuthGuard>
          <RouterProvider router={router} />
        </AuthGuard>
      </MantineProvider>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
