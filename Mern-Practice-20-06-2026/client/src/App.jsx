
import './App.css'
import Navbar from './components/Navbar'
import Blacklist from './pages/Blacklist';
import Form from './pages/Form'
import Home from './pages/Home'
import {BrowserRouter, Routes,  Route} from 'react-router-dom';
import UserData from './pages/UserData';
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/userdata' element={<UserData/>}/>
    <Route path='/blacklist' element={<Blacklist/>}/>
    
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
