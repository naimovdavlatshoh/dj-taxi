import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";

function App() {
    return (
        <>
            <Routes>
                <Route index element={<Login />} />
            </Routes>
        </>
    );
}

export default App;
