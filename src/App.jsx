import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import './App.css'

function App() {
  const loginView = useSelector(state => state.login.auth)
  
  return (
    <div className='container'>
      <Navbar/>
      {!loginView ? 
        ( <Routes>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'*'} element={<Navigate to={'/'}/>}></Route>
            <Route path={'/'} element={<h1 className="info__text">Пройдіть авторизацію та отримайте доступ до можливостей застосунку</h1>}></Route>
          </Routes>)
        :        
        (<Routes>
          <Route path={'/'} element={<Main/>}></Route>
          <Route path={'*'} element={<Navigate to={'/'}/>}></Route>
          <Route path={'/login'} element={<Navigate to={'/'}/>}></Route>
        </Routes>)  
    }
      
      
    </div> 
  )
}

export default App
