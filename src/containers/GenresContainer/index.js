import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GenresComponent from "../../components/GenresComponent";
import { getGenres, getStylesForGenre } from "../../state/actions/preferencesActions";
import { getUserDetails, updateUserData } from "../../state/actions/userActions";

const GenresContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedGenreArray, setSelectedGenreArray] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selections, setSelections] = useState({});

  const genres = useSelector((state) => state?.preferences?.genres || []);
  const styles = useSelector((state) => state?.preferences?.styles || []);
  const userData = useSelector((state) => state?.userDetails?.user || {});

  useEffect(() => {
    dispatch(getUserDetails(true, true, true));
    dispatch(getGenres());
  }, []);

  const handleToggleDrawer = useCallback(() => {
    setOpenDrawer(!openDrawer);
  }, [openDrawer]);

  useEffect(() => {
    if (styles?.length > 0) {
      setOpenDrawer(true);
    }
  }, [styles]);

  const handleStylesSelect = useCallback(
    (styleId, genresId) => {
      if (selectedStyles.includes(styleId)) {
        setSelectedStyles(selectedStyles.filter((x) => x !== styleId));
        setSelections({ ...selections, [genresId]: selections[genresId] - 1 });
      } else {
        setSelectedStyles([...selectedStyles, styleId]);
        setSelections({ ...selections, [genresId]: selections[genresId] + 1 });
      }
    },
    [selectedStyles, selections]
  );

  const handleSelectGenre = useCallback(
    (genresId) => {
      setSelectedGenre(genresId);
      if (selectedGenreArray.includes(genresId)) {
        if (selections[genresId] < 1) {
          setSelectedGenreArray(selectedGenreArray.filter((x) => x !== genresId));
        } else {
          dispatch(getStylesForGenre(genresId));
        }
      } else {
        dispatch(getStylesForGenre(genresId));
        setSelectedGenreArray([...selectedGenreArray, genresId]);
        setSelections({ ...selections, [genresId]: selections[genresId] || 0 });
      }
    },
    [selectedGenreArray, selections]
  );

  const handleSaveGenres = useCallback(() => {
    const payload = {
      favourite_genres: selectedGenreArray,
      favourite_styles: selectedStyles,
    };
    dispatch(updateUserData(payload)).then((resp) => {
      if (resp.ok) {
        history.push("/initial-setup/personalInfo");
      }
    });
  }, [selectedGenreArray, selectedStyles]);

  return (
    <GenresComponent
      genres={genres}
      openDrawer={openDrawer}
      handleToggleDrawer={handleToggleDrawer}
      handleSelectGenre={handleSelectGenre}
      selectedGenre={selectedGenre}
      selectedGenreArray={selectedGenreArray}
      styles={styles}
      selectedStyles={selectedStyles}
      handleStylesSelect={handleStylesSelect}
      selections={selections}
      userData={userData}
      handleSaveGenres={handleSaveGenres}
    />
  );
};

export default GenresContainer;
