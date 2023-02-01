import React, { useEffect, useState } from 'react';
import { useActionData } from 'react-router';
import AppEntry from './AppEntry';
import Modal from './Modal';
import axios from 'axios';

const ApplicationView = (props) => {
  const [appInfo, setAppInfo] = useState([{ company: 'Google', _id: 1 }]); // insert a string to test
  const [modalState, setModalState] = useState('add');
  const [show, setShow] = useState(false);
  const [idx, setIdx] = useState(0);
  //   const [visible, setVisible] = useState('');

  // Set up nav bar
  useEffect(() => {
    props.showNav(true);
    console.log(props.userInfo);

    axios
      .get(`http://localhost:3000/user/${props.userInfo._id}`)
      .then((res) => {
        console.log('data', res.data);
        setAppInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const showModal = (input) => {
  //     setShow(true);
  //     setModalState(input)
  // }
  //total applications
  const arrOfApps = [];
  for (let i = 0; i < appInfo.length; i++) {
    arrOfApps.push(
      <AppEntry
        index={i}
        setShow={setShow}
        // setVisible={setVisible}
        snow={show}
        modalState={modalState}
        setModalState={setModalState}
        /*need to pass in entry at index i */
        appInfo={appInfo[i]}
        setIdx={setIdx}
      />
    );
  }

  // set up modal for edit button
  // CREATE TABLE applications (
  //     "_id" serial PRIMARY KEY,
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

  // // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //     if (event.target == modal) {
  //         modal.style.display = "none";
  //     }
  // }

  return (
    <div className='appContainer'>
      <button
        onClick={(e) => {
          setShow(true);
          console.log('add clicked', modalState);
          setModalState('add');
        }}
      >
        Add Application
      </button>
      <div className='appTableContainer'>
        <table className='appTable'>
          <tr className='appHeaderRow'>
            <th classname='appHeaders'> # </th>
            <th classname='appHeaders'> Company </th>
            <th classname='appHeaders'> Title </th>
            <th classname='appHeaders'> Link </th>
            <th classname='appHeaders'> Method </th>
            <th classname='appHeaders'> Date </th>
            <th classname='appHeaders'> Resume </th>
            <th classname='appHeaders'> Cover Letter </th>
            <th classname='appHeaders'> Progess </th>
            <th classname='appHeaders'> Edit </th>
          </tr>
          {arrOfApps}
          <tr>
            <td> 1 </td>
            <td> Google </td>
            <td> Senior Software Developer </td>
            <td> Link </td>
            <td> External Recruiter </td>
            <td> 1/31/23 </td>
            <td> Resume A </td>
            <td> No Cover Letter </td>
            <td>
              {' '}
              <progress id='file' max='100' value='25'></progress>
            </td>
            <td>
              {' '}
              <button>edit</button>
            </td>
          </tr>
          <tr>
            <td> 2 </td>
            <td> Apple </td>
            <td> Full Stack Engineer </td>
            <td> Link </td>
            <td> Website </td>
            <td> 1/31/23 </td>
            <td> Resume A </td>
            <td> Cover Letter </td>
            <td>
              {' '}
              <progress id='file' max='100' value='60'></progress>
            </td>
            <td>
              {' '}
              <button>edit</button>
            </td>
          </tr>
          <tr>
            <td> 3 </td>
            <td> Amazon </td>
            <td> Back End Developer </td>
            <td> Link </td>
            <td> Internal Recruiter </td>
            <td> 1/31/23 </td>
            <td> Resume B </td>
            <td> No Cover Letter </td>
            <td>
              {' '}
              <progress id='file' max='100' value={40}></progress>
            </td>
            <td>
              {' '}
              <button>edit</button>
            </td>
          </tr>
        </table>
      </div>
      <Modal
        onClose={() => {
          return setShow(false);
        }}
        show={show}
        closeModal={() => {
          setShow(false);
        }}
        id={modalState}
        info={appInfo[idx]}
        userInfo={props.userInfo}
      />
    </div>
  );
};

export default ApplicationView;
