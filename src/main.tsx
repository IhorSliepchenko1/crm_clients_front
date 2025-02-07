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
        path: "/registration",
        element: <>dfd</>
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
