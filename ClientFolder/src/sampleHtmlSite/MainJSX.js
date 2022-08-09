// import React from 'react'
// import './MainComp.css'
// import ChatComp from './ChatComp'
// import {useState,useEffect} from 'react'

const e = React.createElement;

function MainComp() {

    React.useEffect(()=>{
        var modal = document.getElementById("Modal");
        var btn = document.getElementById("Btn");
        var span = document.getElementsByClassName("close")[0];
        console.log(btn)
        btn.onclick = function(e) {
            console.log("Clicked")
            e.preventDefault()
            modal.style.display = "block";
        }
        span.onclick = function(e) {
            e.preventDefault()
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            event.preventDefault()
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    },[])
    const handleClick=(e)=>{
        var modal = document.getElementById("Modal");
        console.log("Clicked")
        e.preventDefault()
        modal.style.display = "block";
    }
    return (
        <>
        <div>
            <div id="Modal" className="modal">
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <div>Super content</div>
                </div>
            </div>
            <a href="#" className="float" onClick={handleClick}>
            <i className="fa fa-plus my-float" id="Btn"></i>
            </a>
        </div>
    </>
    )
}

const domContainer = document.getElementById('rootMain')
const root = ReactDOM.createRoot(domContainer);
root.render(e(MainComp));

// export default MainComp