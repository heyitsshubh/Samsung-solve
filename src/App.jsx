import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Quiz from './Components/Quiz'
import Result from './Components/Result'
import BasketballMotion from './Components/Basketballmotion'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{height:'100vh', background:'#065F46', color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontSize: '1.875rem'}}>
            Home<br />
            <Link to="/basketballmotion" style={{marginTop:32, padding:'12px 24px', background:'#fff', color:'#065F46', borderRadius:12, fontSize:'1.25rem', fontWeight:700, textDecoration:'none', transition:'background 0.2s'}}>Click</Link>
          </div>
        } />
        <Route path="/basketballmotion" element={<BasketballMotion />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result/> }/> 
      </Routes>
    </Router>
  )
}

export default App
