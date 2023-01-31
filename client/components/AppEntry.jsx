import React, { useState} from 'react';

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
            <td>
                #
            </td>
            <td>
                Company
            </td>
            <td>
                Link
            </td>
            <td>
                Date
            </td>
            <td>
                Resume A
            </td>
            <td>
                <progress id="file" max="100" value="70"> text </progress>
            </td>
            <td>
                <button id='num' onClick={()=>{props.modalClick();props.setIndex(props.index)}}>edit</button>
            </td>
        </tr>   
    )
}

export default AppEntry;