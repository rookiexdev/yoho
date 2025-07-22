import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage, LoginPage, PageNotFound, UploadDocument } from "./pages";
import { MainLayout } from "./layouts";

export default function App() {
  return <Router />;
}

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/error" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
