import React, { useState } from 'react';
import Modal from './Modal';

const AppEntry = (props) => {
  /*
        0 = started application
        20 = submitted application 
        40 = phone screening
        60 = first round interview
        80 = second round interview 
        100 = offer 
            (accept or rejected)
    */
  return (
    <tr>
      <td> {props.index + 1} </td>
      <td> {props.appInfo.company} </td>
      <td> {props.appInfo.job_title} </td>
      <td> {props.appInfo.link} </td>
      <td> {props.appInfo.submission_method} </td>
      <td> {props.appInfo.date_submitted} </td>
      <td> {props.appInfo.resume_id} </td>
      <td> {props.appInfo.cover_letter_status} </td>
      <td>
        {' '}
        <progress
          id='file'
          max='100'
          value={props.appInfo.progress_status}
        ></progress>{' '}
      </td>
      <td>
        {' '}
        <button
          onClick={(e) => {
            props.setShow(true);
            console.log('edit clicked', props.modalState);
            props.setModalState('edit');
            props.setIdx(props.index);
          }}
        >
          edit
        </button>{' '}
      </td>
      {/* <Modal
        onClose={() => {
          return props.setShow(false);
        }}
        show={props.show}
        closeModal={() => {
          setShowEdit(false);
        }}
        id={props.modalState}
      /> */}
    </tr>
  );
};

export default AppEntry;
