import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Events from "./views/events/Events";
import Home from "./views/home/Home";
import Partners from "./views/partners/Partners";
import Application from "./views/application/Application";
import Resources from "./views/resources/Resources";
import Blog from "./views/blog/Blog";
import {
  getCurrentPartners,
  getPartnerData,
} from "./firebase/utils";

const mergeStorageData = async (partners) => {
  return await Promise.all(
    Object.values(partners).map(async (elt) => {
      return {
        ...elt,
        current: [...elt.current],
        storageData: await getPartnerData(elt.applicationId),
      };
    })
  );
};

const partnersLoader = async () => {
  const dbPartners = await getCurrentPartners();
  const partners = await mergeStorageData(dbPartners);
  return partners;
};

const router = createHashRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "events",
          element: <Events />,
        },
        {
          path: "partners",
          element: <Partners />,
          loader: partnersLoader,
        },
        {
          path: "apply",
          element: <Application />,
        },
        {
          path: "resources",
          element: <Resources />,
        },
        {
          path: "blog",
          element: <Blog />
        }
      ],
    },
  ],
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
