import React from 'react';
import './dashboard.styles.scss';
import { ReactComponent as Search } from '../../assets/img/dashboard/search.svg';
import { ReactComponent as Clear } from '../../assets/img/musician/clear input.svg';
import SearchGold from '../../assets/img/search.png';
import InfluencerCard from './influencerCard';


const InfluencerComponent = ({ state, handleOnChange, handleOpenProfile, handleClearSearch }) => {
    return (
        <>
            <div className="search-bar-container">
                <div className="search-input-container">
                    <Search />
                    <input
                        type="text"
                        id="searchValue"
                        className="search-input"
                        value={state.searchValue}
                        onChange={handleOnChange}
                        placeholder="Search by influencer name..."
                    />
                    {state.searchValue.length ? <Clear onClick={handleClearSearch} /> : <div />}
                </div>
            </div> <div className="influencer-main-container">
                <span className="influencer-header">Influencers</span>
                <section className="influencer-section">
                    {state.allData?.length ? state.allData?.map((userData) => {
                        return (
                            <InfluencerCard key={userData._id} onClick={() => handleOpenProfile(userData)} userData={userData} />
                        )
                    }) :
                        <section className="empty-search-container">
                            <div className="empty-search-sub-container">
                                <img src={SearchGold} alt='Search' />
                                <span className="no-result-txt ">No results found!</span>
                            </div>
                        </section>
                    }
                </section>
            </div>
        </>
    )
}

export default InfluencerComponent;