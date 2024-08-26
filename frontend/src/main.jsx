import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./app.css"
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
