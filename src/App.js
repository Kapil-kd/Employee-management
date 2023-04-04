import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { Login } from './components/login';
import { Register } from './components/register';
import { Create } from './components/Create';
import { Update } from './components/Update';



function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path='home' element={<Home/>} />
      <Route path='create' element={<Create/>} />
      <Route path='update' element={<Update/>} />
    </Routes>
  );
}

export default App;
