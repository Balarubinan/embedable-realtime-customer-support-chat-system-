import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import {useNavigate } from 'react-router-dom'
import ChatComp from './ChatComp';
import embedInstructPage from './embedInstructPage';
import OperatorPage from './OperatorPage';
import MainComp from './MainComp';

function HomeComp() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainComp/>}/>
          <Route path="/homePage" element={<embedInstructPage/>}/>
          <Route path="/operatorSide" element={<OperatorPage/>}/>
        </Routes>
    </Router>
  )
}

export default HomeComp