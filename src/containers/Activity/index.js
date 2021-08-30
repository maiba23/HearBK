import React, {useState, useEffect, useCallback} from "react";
import ActivityComponent from "../../components/Activity";
import {useSelector, useDispatch} from 'react-redux'
import {GetLatestActivities} from '../../state/actions/homeAction'
import { setOpenProfileDispatch, setSelectedProfile } from '../../state/actions/homeAction';

const Activity = ({onClose}) => {
    const user = useSelector((state) => state.userDetails.user)
    let dispatch = useDispatch()
    const openProfile = useSelector(state => state.home.openProfile);


    useEffect(() => {
        getLatestActivity()
    }, [])

    const handleOpenProfile = useCallback((userData) => {
      if(userData) {
          dispatch(setSelectedProfile({...userData}))
      }
      dispatch(setOpenProfileDispatch(!openProfile))
  }, [openProfile])

    const getLatestActivity = () => {
        var data = ''
        user?.following?.length > 0 && user.following.map((element, index) => {
            if(element.id) {
              data = data + element.id + ','
            }
        });
        user?.followers?.length > 0 && user.followers.map((element, index) => {
          if(element.id) {
            data = data + element.id + (index === user.followers.length - 1 ? '' : ',')
          }
        })
        if (data.charAt(data.length - 1) === ",") {
            data = data.slice(0, -1)
        }
        dispatch(GetLatestActivities(data))
    }

  return (
    <ActivityComponent
      onClose={onClose}
      handleOpenProfile={handleOpenProfile}
    />
  );
};

export default Activity;
