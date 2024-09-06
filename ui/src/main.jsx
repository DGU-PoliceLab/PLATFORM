// 라이브러리
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// 서비스
// 레이아웃
import RootLayout from "./layouts/root/layout";
// 페이지
import MultiViewPage from "./pages/multiview/page";
import DetailViewPage from "./pages/detailview/page";
import EventManagePage from "./pages/event/manage/page";
import CctvManagePage from "./pages/cctv/manage/page";
import LocationManagePage from "./pages/location/manage/page";
import ErrorPage from "./pages/error/page";
import NotFoundPage from "./pages/notfound/page";
// 스타일
import "./index.css";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then((registration) => {
                console.log(
                    "Service Worker registered with scope:",
                    registration.scope
                );
            })
            .catch((error) => {
                console.log("Service Worker registration failed:", error);
            });
    });
}

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <MultiViewPage />,
            },
            {
                path: "/detail/:id",
                element: <DetailViewPage />,
            },
            {
                path: "/event",
                element: <EventManagePage />,
            },
            {
                path: "/cctv",
                element: <CctvManagePage />,
            },
            {
                path: "/location",
                element: <LocationManagePage />,
            },
        ],
    },
    {
        path: "/error/server",
        element: <ErrorPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
