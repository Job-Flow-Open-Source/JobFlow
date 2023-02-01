import React, { useEffect, useState } from 'react';
import { useActionData } from 'react-router';
import AppEntry from './AppEntry';
import Modal from './Modal';
import axios from 'axios';

const ApplicationView = (props) => {
    const [ appInfo, setAppInfo ] = useState([])
    const [modalState, setModalState] = useState('')
    const [show, setShow] = useState(false);

    // Set up nav bar 
    useEffect(()=> {
    props.showNav(true)
    console.log(props.userInfo)
    
    // axios.get(`http://localhost:3000/user/${props.userInfo._id}`)
    //     .then(res => {
    //         console.log('data', res.data)
    //         setAppInfo(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    },[])
    
    // const showModal = (input) => {
    //     setShow(true);
    //     setModalState(input)
    // }
    //total applications
    const arrOfApps = [];
    for (let i = 0; i < appInfo.length; i++){
        arrOfApps.push(<AppEntry 
            // modalClick={showModal} 
            index={i} 
            /*need to pass in entry at index i */
            appInfo={appInfo[i]}
            setIndex={() => {setIndex}}
        />)
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



    return (
        <div>
            {/* <button onClick={showModal('add')}>Add Application</button> */}
            <div>
            <table>
                <tr > 
                    <th>
                        #
                    </th>
                    <th>
                        Company
                    </th>
                    <th>
                        Title
                    </th>
                    <th>
                        Link
                    </th>
                    <th>
                        Method
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Resume
                    </th>
                    <th>
                        Cover Letter
                    </th>
                    <th>
                        Progess
                    </th>
                    <th>
                        Edit
                    </th>
                </tr>        
                {arrOfApps}
            </table>    
            </div>
              {/* <Modal
                onClose={() => { return setShow(false)}}
                show={show}
                info = {props.entries[i]}
            /> */}
        </div>
    )
}


export default ApplicationView;

