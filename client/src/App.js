import {
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom";
import "./App.css";
import Pontos from "./pages/Pontos";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Home from "./pages/Home";
import PopupBuscarPonto from "./pages/PopupBuscarPonto";
import ResultadosPontos from './pages/ResultadosPontos';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import SugestaoPonto from './pages/SugestaoPonto';
import Admin from './pages/Admin';
import Informacao from './pages/Informacao';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pontos/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/buscarPontos" element={<PopupBuscarPonto/>}/>
        <Route path="/resultados" element={<ResultadosPontos />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/sugerirPonto" element={<SugestaoPonto />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/info" element={<Informacao />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
