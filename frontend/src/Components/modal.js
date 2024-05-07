import React from 'react';
import './Modal.css';
const Modal = ({ title, body, onClose }) => {
  return (
    
    <div className="modal-overlay" >
          <div className="modal-dialog modal-xl" >
            <div className="modal-content">
            <div className="modal-header">
            
            <h4 className="modal-title">{title}</h4>
            <button type="button" class="btn-close" data-dismiss="modal"  onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" style={{ padding: '0.35rem 0.5rem', fontSize: '1rem' }} onClick={onClose}>Close</button>
          </div>
            </div>
          </div>
          </div>
  );
};

export default Modal;
