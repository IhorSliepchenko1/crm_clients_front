import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { AuthGuard } from './features/authGuard'

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/",
    element: <>fgfg</>
  },
  // {
  //   path: "/",
  //   element: <Layout />,
  //   children: [
  //     {
  //       path: "/registration",
  //       element: <Registration />,
  //     },
  //   ],
  // },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <AuthGuard>
        <RouterProvider router={router} />
      </AuthGuard>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
