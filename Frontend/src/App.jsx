/* -- this is for the routes in the web -- */
import {BrowserRouter, Routes, Route } from "react-router-dom"

function App(){
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element = {<h1>Home</h1>}/>
      <Route path="/login" element = {<h1> En rutado 1</h1>}/>
      <Route path="/home" element = {<h1> Home</h1>}/>
      <Route path="/About" element = {<h1> About</h1>}/>
      <Route path="/portfolio" element = {<h1> Portafolio</h1>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App