import React from 'react';

const Modal = (props) => {
    if (!props.show) {
        return null;
    }


    // pick up specific application details based on ID



    // update method to save changes to application in the DB


    // some sort of close button with user message saying "saved"


    return (
        <div className="ModalPage">
        <div className="ModalBox">
          <form className="modalForm" method="POST" action="/entry/edit">
            <label htmlFor="company">Company: </label>
            <input className="formInfo" id="company" name="company" type="text">{/* pre-populated with existing info*/}</input>
            <label htmlFor="name">Name: </label>
            <input className="formInfo" id="name" name="name" type="text"></input>
            <label htmlFor="date">Date: </label>
            <input className="formInfo" id="date" name="date" type="text"></input>
            <label htmlFor="Resume">Resume: </label>
            <input className="formInfo" id="Resume" name="Resume" type="text"></input>
            <input className="saveBtn" type="submit" value="Save"></input>
            <a href='/'>Back</a>
          </form>
        </div>
      </div>
    )
}

export default Modal;