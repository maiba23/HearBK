import React from 'react';
import './dashboard.styles.scss';
import { ReactComponent as Clear } from '../../assets/img/musician/clear input.svg';

const Profile = ({onClose}) => {
    return (
        <div className="profile-container">
            <Clear onClick={onClose}/>
        </div>
    )
}

export default Profile;