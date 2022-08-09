"use strict";
const e = React.createElement;

// import React from 'react'
// import './MainComp.css'
// import ChatComp from './ChatComp'
// import {useState,useEffect} from 'react'
function MainComp() {
  React.useEffect(function () {
    var modal = document.getElementById("Modal");
    var btn = document.getElementById("Btn");
    var span = document.getElementsByClassName("close")[0];
    console.log(btn);

    btn.onclick = function (e) {
      console.log("Clicked");
      e.preventDefault();
      modal.style.display = "block";
    };

    span.onclick = function (e) {
      e.preventDefault();
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      event.preventDefault();

      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }, []);

  var handleClick = function handleClick(e) {
    var modal = document.getElementById("Modal");
    console.log("Clicked");
    e.preventDefault();
    modal.style.display = "block";
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    id: "Modal",
    className: "modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "close"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", null, "Super content"))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "float",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-plus my-float",
    id: "Btn"
  }))));
} // export default MainComp


const domContainer = document.getElementById('rootMain')
const root = ReactDOM.createRoot(domContainer);
root.render(e(MainComp));