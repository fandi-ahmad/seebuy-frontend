import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashhboard } from "./pages/Dashhboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashhboard/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
