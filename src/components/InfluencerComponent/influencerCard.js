import React from 'react';
import './dashboard.styles.scss';
import Profile from '../../assets/img/default-user-pic.png'
import { ReactComponent as Verified } from '../../assets/icon/verifeied.svg';
import { useSelector } from 'react-redux';

const InfluencerCard = ({ onClick, userData }) => {

    const roles = useSelector(state => state.listeners.rolesList)

    let level = "";
    if (userData.listener_roles) {
        userData.listener_roles.forEach((roleId, index) => {
            roles.forEach((role) => {
                if (role._id === roleId) {
                    level = index > 0 ? level + ", " + role.name : level + role.name;
                }
            });
        });
    }


    return (
        <div key={userData._id} className="influencer-profile-container" onClick={onClick}>
            <img src={userData.profile_image ? userData.profile_image : Profile} alt="profile" className="influencer-profile" />
            <section className="name-container">
                <div className="profile-name-container">
                    <span className="influencer-profile-name">{userData.display_name}</span>
                    <Verified />
                </div>
                <span className="listener-roles">{level.toLowerCase()}</span>
            </section>
        </div>
    )
}

export default InfluencerCard;