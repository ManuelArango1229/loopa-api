import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResetPassword from "./pages/ResetPassword";

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        </BrowserRouter>
    );
    }

export default App;