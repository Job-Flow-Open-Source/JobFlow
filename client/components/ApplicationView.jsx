import React, {useEffect} from 'react';
import { useActionData } from 'react-router';
import AppEntry from './AppEntry';
import Modal from './Modal';

const ApplicationView = (props) => {
    // const [show, setShow] = useState(false);
    // const [index, setIndex] = useState(0);


    // Set up nav bar 
    useEffect(()=> {
    props.showNav(true)
    },[])
    
    
    //total applications
    const arrOfApps = [];
    for (let i = 0; i < 3; i++){
        arrOfApps.push(<AppEntry 
            modalClick={(e) => {
                setShow(true)}}  
            index={i} 
            /*need to pass in entry at index i */
            setIndex={() => {setIndex}}
        />)
    }

    // set up modal for edit button
    



    return (
        <div>
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
                        Link
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Resume
                    </th>
                    <th>
                        Progess Bar
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
                info = {props.entries[index]}
            /> */}
        </div>
    )
}


export default ApplicationView;

