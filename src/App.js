import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/css/tailwind.css'
import './assets/css/tailwind.output.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import './assets/css/mycss.css'

import { Dashhboard } from "./pages/Dashhboard";
import DataAdmin from "./pages/DataAdmin";
import MenuBazar from "./pages/MenuBazar";
import { DataPesanan } from "./pages/DataPesanan";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashhboard/>} />
                <Route path="/data-admin" element={<DataAdmin/>} />
                <Route path="/menu-bazar" element={<MenuBazar/>} />
                <Route path="/data-pesanan" element={<DataPesanan/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
