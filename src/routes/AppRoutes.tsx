import { BrowserRouter, Routes, Route } from "react-router-dom";
import BacklogScreen from "../components/ui/BacklogScreen";
import SprintScreen from "../components/ui/SprintScreen";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BacklogScreen />} />
                <Route path="/sprint/:id" element={<SprintScreen />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
