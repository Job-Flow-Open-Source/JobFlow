import React from 'react';
import axios from 'axios';

const Modal = (props) => {
    if (!props.show) {
        return null;
    }
    function editApp(e) {
      e.preventDefault();
      const data = new FormData(e.target)
      const objData = Object.fromEntries(data.entries())
      console.log(objData);
      // const [company, name, date, resume] = [e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value]
      // consider async and await
      if (props.modalState === 'add'){
        axios.post('/addPost', {
          company, 
          name, 
          date,
          resume
        })
        .then(res => {
          console.log("Updated the data")
        })
      } else{
        axios.patch('/editPost', {
          company, 
          name, 
          date,
          resume
        })
        .then(res => {
          console.log("Updated the data")
        })
      }
      
    }

    // pick up specific application details based on ID



    // update method to save changes to application in the DB


    // some sort of close button with user message saying "saved"


 // set up modal for edit button


       // CREATE TABLE applications (
    //     "_id" serial PRIMARY KEY, // application
    //     "company" varchar NOT NULL,
    //     "job_title" varchar
    // //  "link" varchar default '', 
    //     "submission_method" varchar,
    //     "date_submitted" DATE default current_date,

    // //  "resume_name" 
    //     "coverletter_status" varchar default 'No Cover Letter',
    //     "progress_status" int NOT NULL,
    
    //     "user_id" int REFERENCES users(_id) ON DELETE CASCADE,
    //     "resume_id" int REFERENCES resumes(_id) ON DELETE CASCADE,
    //   );



    return (
        <div className="ModalPage">
        <div className="ModalBox">
          {/* <form className="modalForm" method="POST" action="/entry/edit"> */}
          <form className='modalForm' onSubmit={editApp}>
            <label htmlFor="company">Company: </label>
            <input className="formInfo" id="company" name="company" type="text">{props.appInfo ? props.appInfo.company : ""}</input>
            <label htmlFor="jobTitle">Job Title: </label>
            <input className="formInfo" id="title" name="title" type="text"></input>
            <label htmlFor="link">Link: </label>
            <input className="formInfo" id="link" name="link" type="text"></input>
            <label htmlFor="submission">Submission Method:</label>
            <select name="submission" id="submission">
                <option value="Company Site">Company Site</option>
                <option value="Internal Recruiter">Internal Recruiter</option>
                <option value="External Recruiter">External Recruiter</option>
                <option value="3rd Party Site">3rd Party Site</option>
            </select>

            <label htmlFor="submitDate">Date Submitted: </label>
            <input className="formInfo" id="submitDate" name="submitDate" type="text"></input>
            <label htmlFor="Resume">Resume name: </label>
            <input className="formInfo" id="Resume" name="Resume" type="text"></input>
            <label htmlFor="progress">Progress Status: </label>
            <input className="formInfo" id="progress" name="progress" type="text"></input>
            
            <label htmlFor="progress">Progress Status:</label>
            <select name="progress" id="progress" >
                <option value="0">Started Application</option>
                <option value="20">Submitted Application</option>
                <option value="40">Phone Screening</option>
                <option value="60">First Round</option>
                <option value="80">Second Round</option>
                <option value="100">Offer</option>
            </select>            

            <input className="saveBtn" type="submit" value="Save">Submit</input>
            <a href='/'>Back</a>
          </form>
        </div>
      </div>
    )
}

export default Modal;