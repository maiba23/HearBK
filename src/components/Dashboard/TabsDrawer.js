import React from 'react';
import cx from 'classnames';
import './dashboard.styles.scss';
import { ReactComponent as Clear } from '../../assets/img/musician/clear input.svg';
import { useHistory } from "react-router-dom";

const TabsDrawer = ({ onClose, selectedTab, setSelectedTab }) => {
    let history = useHistory();
    const handleTabChange = (value) => {
        setSelectedTab(value)
        onClose();
    }
    const doLogout = () => {
        localStorage.removeItem("x-access-token");
        history.push("/login");
    }
    return (
        <div className="tabs-main-container">
            <Clear onClick={onClose} className="close-icon" />
            <div className="tab-item-container" onClick={() => handleTabChange(0)}><span className={cx("tab-text",  selectedTab === 0 && "selected-tab-text")}>TRACKS</span></div>
            <div className="tab-item-container" onClick={() => handleTabChange(1)}><span className={cx("tab-text",  selectedTab === 1 && "selected-tab-text")}>INFLUENCERS</span></div>
            <div className="tab-item-container" onClick={doLogout}><span className={cx("tab-text")}>LOGOUT</span></div>
            {/* <div className="tab-item-container" onClick={() => handleTabChange(2)}><span className={cx("tab-text",  selectedTab === 2 && "selected-tab-text")}>MAILS</span></div> */}
        </div>
    )
}

export default TabsDrawer;