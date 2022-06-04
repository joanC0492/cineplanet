import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal-main">{children}</div>,
    document.getElementById("modal")
  );
}

export { Modal };
