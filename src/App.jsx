import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home'
import Quiz from './Components/Quiz'
import Result from './Components/Result'
import BasketballMotion from './Components/Basketballmotion'
import Module from './Components/Module'


function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/basketballmotion" element={<BasketballMotion />} />
        <Route path="/module" element={<Module />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result/> }/> 
      </Routes>
    </Router>
  )
}

export default App
