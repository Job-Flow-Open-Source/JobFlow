import React from 'react';
import axios from 'axios';

const Modal = (props) => {
  if (!props.show) {
    console.log('modal');
    return null;
  }
  console.log('this is props.info:', props.info);
  function editApp(e) {
    e.preventDefault();
    console.log('This is e.target', e.target);
    const data = new FormData(e.target);
    const objData = Object.fromEntries(data.entries());
    console.log(objData);
    console.log('this is userInfo from Modal', props.userInfo);
    // const appID = props.info._id;
    const {
      company,
      title,
      link,
      progress,
      submission,
      submitDate,
      resume,
      coverletter,
    } = objData;
    console.log('this is Resume', resume);
    //   // consider async and await
    if (props.id === 'add') {
      axios
        .post(`http://localhost:3000/application/`, {
          company: company,
          job_title: title,
          link: link,
          progress_status: progress,
          submission_method: submission,
          date_submitted: submitDate,
          resume_name: resume,
          coverletter_status: coverletter,
          user_id: props.userInfo._id,
        })
        .then((res) => {
          console.log('Application added');
          props.refreshApps();
        })
        .catch((err) => {
          console.log('Add application had an error');
        });
    }
    if (props.id === 'edit') {
      console.log('we are editting');
      axios
        .patch(`http://localhost:3000/application/`, {
          company: company,
          job_title: title,
          link: link,
          progress_status: progress,
          submission_method: submission,
          date_submitted: submitDate,
          resume_name: resume,
          coverletter_status: coverletter,
          user_id: props.userInfo._id,
          application_id: props.info._id,
        })
        .then((res) => {
          console.log('Application updated');
          props.refreshApps();
        })
        .catch((err) => {
          console.log('Updated application had an error');
        });
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
    <div className='ModalPage'>
      <div className='ModalBox'>
        <span
          className='close'
          onClick={() => {
            console.log(`close clicked ${props.id}`);
            props.closeModal();
          }}
        >
          &times;
        </span>
        {/* <form className="modalForm" method="POST" action="/entry/edit"> */}
        <form className='modalForm' onSubmit={editApp}>
          <label className='ModalLabel' htmlFor='company'>
            Company:{' '}
          </label>
          <input
            className='ModalInput'
            id='company'
            name='company'
            type='text'
            defaultValue={props.id === 'edit' ? props.info.company : ''}
          ></input>
          <label className='ModalLabel' htmlFor='jobTitle'>
            Job Title:{' '}
          </label>
          <input
            className='ModalInput'
            id='title'
            name='title'
            type='text'
            defaultValue={props.id === 'edit' ? props.info.job_title : ''}
          ></input>
          <label className='ModalLabel' htmlFor='link'>
            Link:{' '}
          </label>
          <input
            className='ModalInput'
            id='link'
            name='link'
            type='text'
            defaultValue={props.id === 'edit' ? props.info.link : ''}
          ></input>
          <label className='ModalLabel' htmlFor='submission'>
            Submission Method:
          </label>
          <select
            className='ModalInput'
            name='submission'
            id='submission'
            defaultValue={
              props.id === 'edit' ? props.info.submission_method : ''
            }
          >
            <option value='Company Site'>Company Site</option>
            <option value='Internal Recruiter'>Internal Recruiter</option>
            <option value='External Recruiter'>External Recruiter</option>
            <option value='3rd Party Site'>3rd Party Site</option>
          </select>

          <label className='ModalLabel' htmlFor='submitDate'>
            Date Submitted:{' '}
          </label>
          <input
            className='ModalInput'
            id='submitDate'
            name='submitDate'
            type='text'
            defaultValue={props.id === 'edit' ? props.info.date_submitted : ''}
          ></input>
          <label className='ModalLabel' htmlFor='resume'>
            Resume name:{' '}
          </label>
          {/* <input
            className='ModalInput'
            id='Resume'
            name='Resume'
            type='text'
          ></input> */}
          <select
            className='ModalInput'
            name='resume'
            id='resume'
            defaultValue={props.id === 'edit' ? props.info.resume : ''}
          >
            <option value='Mia_ver1'>Mia_ver1</option>
            <option value='Mia_ver2'>Mia_ver2</option>
          </select>

          <label className='ModalLabel' htmlFor='coverletter'>
            Cover Letter:{' '}
          </label>
          {/* <input
            className='ModalInput'
            id='coverletter'
            name='coverletter'
            type='text' 
          ></input> */}
          <select
            className='ModalInput'
            name='coverletter'
            id='coverletter'
            defaultValue={
              props.id === 'edit' ? props.info.coverletter_status : ''
            }
          >
            <option value='No Cover Letter'>No Cover Letter</option>
            <option value='Standard Letter'>Standard Letter</option>
            <option value='Custom Letter'>Custom Letter</option>
          </select>

          <label className='ModalLabel' htmlFor='progress'>
            Progress Status:
          </label>
          <select
            className='ModalInput'
            name='progress'
            id='progress'
            defaultValue={props.id === 'edit' ? props.info.progress_status : ''}
          >
            <option value={0}>Started Application</option>
            <option value={20}>Submitted Application</option>
            <option value={40}>Phone Screening</option>
            <option value={60}>First Round</option>
            <option value={80}>Second Round</option>
            <option value={100}>Offer</option>
          </select>
          <div>
            <input
              className='ModalInput'
              type='submit'
              value={props.id}
            ></input>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
