import { Route, Routes } from "react-router-dom";
import HomeRoot from "./pages/HomeRoot";
import JavaPage from "./pages/JavaPage";
import JSPage from "./pages/JSPage";
import PythonPage from "./pages/PythonPage";

import React from 'react'

const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomeRoot />} />
                <Route exact path="java-stack" element={<JavaPage />} />
                <Route exact path="ts-stack" element={<JSPage />} />
                <Route exact path="py-stack" element={<PythonPage />} />
            </Routes>
        </>


    )
}

export default MainRoutes