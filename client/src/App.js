import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Routes, Route } from 'react-router-dom'
import Content from './components/Content'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home />}/>
        <Route path = '/login' element = {<Login />}/>
        <Route path = '/register' element = {<Register />}/>
        <Route path = '/content' element = {<Content />}/>
      </Routes>
    </div>
  );
}

export default App;
