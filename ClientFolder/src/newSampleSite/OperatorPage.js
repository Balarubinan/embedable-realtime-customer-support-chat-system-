import React from 'react'
import ChatComp from './ChatComp'

function OperatorPage() {
  return (
    <div className='opDiv'>
      <div className="topnav">
        <a class="active" href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
      <div className='opContent'> 
      <ChatComp isOp={true}/>
      </div>
    </div>
  )
}
export default OperatorPage