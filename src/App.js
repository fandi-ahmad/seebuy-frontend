import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/css/tailwind.css'
import './assets/css/tailwind.output.css'
import '@fortawesome/fontawesome-svg-core/styles.css';

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
