import { BrowserRouter, Routes,Route } from "react-router-dom";
import Inicio from "./Pages/Inicio";
import Pomodoro from "./Pages/Pomodoro";

// Rotas do Site
export default function Rotas(){
    return(
        <BrowserRouter>
        <Routes>
            <Route index path='/' element={<Inicio></Inicio>} />
            <Route index path='/pomodoro' element={<Pomodoro></Pomodoro>} />
        </Routes>
        </BrowserRouter>
    )
}