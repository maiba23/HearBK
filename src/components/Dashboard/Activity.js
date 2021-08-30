import React, {useEffect} from 'react';
import { ReactComponent as Clear } from '../../assets/img/musician/clear input.svg';
import Profile from '../../assets/img/LandingImage2.png'
import moment from 'moment'
import './dashboard.styles.scss';

const Activity = ({onClose, activities}) => {
    console.log(activities)

    const timeDiffCalc = (dateFuture, dateNow) => {
        let diffInMilliSeconds = (dateNow - dateFuture) / 1000;
        const days = parseInt(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        const hours = parseInt(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        const minutes = parseInt(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;

        if (days > 0) {
            return `${days}d`;
        }
        if (hours > 0) {
            return `${hours}h`;
        }
        if (minutes > 0) {
            return `${minutes}m`;
        }

        return `now`;
    };
    return (
        <div className="activity-main-container">
            <Clear onClick={onClose} className="activity-close-icon"/>
            <div className="activity-container">
                {static_data.map((item, index) => {
                    return(
                        <div className="activity-data-container">
                            <div style={{ display: 'flex'}}>
                            <img src={Profile} alt="profile" className="profile-image" onClick />
                            <div className="user-details">
                                <span className="user-name">{item.message.split('followed')[0]}</span>
                                <span className="message">started following you</span>
                            </div>
                            </div>
                            <span className="time">{timeDiffCalc(
                                            moment(item.created_on.replaceAll(/-/g, '/')),
                                            moment(),
                                            )}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Activity;

const static_data = [
    {
        activity_image: Profile,
        message: 'Pankaj followed you',
        created_on: '2021-01-01 10:00:00 EST',
    },
    {
        activity_image: Profile,
        message: 'Pankaj followed you',
        created_on: '2021-01-01 10:00:00 EST',
    },
    {
        activity_image: Profile,
        message: 'Pankaj followed you',
        created_on: '2021-01-01 10:00:00 EST',
    },
    {
        activity_image: Profile,
        message: 'Pankaj followed you',
        created_on: '2021-01-01 10:00:00 EST',
    },
    {
        activity_image: Profile,
        message: 'Pankaj followed you',
        created_on: '2021-01-01 10:00:00 EST',
    },
    {
        activity_image: Profile,
        message: 'Pankaj followed you',
        created_on: '2021-01-01 10:00:00 EST',
    }
]