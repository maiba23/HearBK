import React from 'react';
import './genres.styles.scss';
import cx from 'classnames';
import Button from '../../common/Button';
import CustomDrawer from '../../common/CustomDrawer';
import Styles from './styleContainer';

const GenresComponent = ({
    genres,
    openDrawer,
    handleToggleDrawer,
    handleSelectGenre,
    selectedGenre,
    selectedGenreArray,
    styles,
    selectedStyles,
    handleStylesSelect,
    selections,
    userData,
    handleSaveGenres,
}) => {

    return (
        <div className="genres-main-container">
            <div className="genres-inner-container">
                <div className="genres-header-txt"><span>{`Hi ${userData?.display_name}! Lets finish your registration!`}</span></div>
                <div className="music-like-txt"><span>What kind of music you like?</span></div>
                <div className="favorite-genres"><span>Select favorite genres:</span></div>
                <div className="genres-container">
                    {genres.map((genre) => {
                        return (
                            <div
                                key={genre._id}
                                className={cx(
                                    "genres-tag-container",
                                    selectedGenreArray.includes(genre._id) && "selected-genre-tag"
                                )}
                                onClick={() => handleSelectGenre(genre._id)}
                            >
                                {genre.name}
                                {selections[genre._id] ? <span className="selected-number" >{selections[genre._id]}</span> : null}
                            </div>
                        )
                    })}
                </div>
                <Button
                    className="genre-button"
                    buttonText="NEXT"
                    onClick={handleSaveGenres}
                    disabled={!selectedGenreArray.length}
                />
            </div>
            <CustomDrawer open={openDrawer} handleOnClose={handleToggleDrawer}>
                <Styles
                    onClose={handleToggleDrawer}
                    selectedGenre={genres.find(genreObject => genreObject._id === selectedGenre) ||{}}
                    styles={styles}
                    selectedStyles={selectedStyles}
                    handleStylesSelect={handleStylesSelect}
                />
            </CustomDrawer>
        </div>
    )
}

export default GenresComponent;