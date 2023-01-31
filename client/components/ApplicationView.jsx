import React, {useEffect} from 'react';
import { useActionData } from 'react-router';
import AppEntry from './AppEntry';

const ApplicationView = (props) => {

useEffect(()=> {
    props.showNav(true)
    },[])
    //total applications
    const arrOfApps = [];
    for (let i = 1; i <= 3; i++){
        arrOfApps.push(<AppEntry/>)
    }

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
                </tr>        
                {arrOfApps}
            </table>    
            </div>
        
        </div>
    )
}


export default ApplicationView;

