import { Drawer } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import FanRolesComponent from "../../components/PersonalInfoComponent/FanRoles/FanRolesComponent";
import PersonalInfoComponent from "../../components/PersonalInfoComponent/PersonalInfoComponent";
import { getRoles } from "../../state/actions/listenerActions";
import { getUserDetails, updateUserData, uploadUserProfile } from "../../state/actions/userActions";
import moment from 'moment';
const genderArray = ["Male", "Female", "Non-binary"];

export default function PersonalInfo() {
  const rolesList = useSelector((state) => state.listeners.rolesList || []);
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = React.useState([]);
  const [selectedCover, setSelectedCover] = React.useState(null);
  const [recentlySelectedRole, setRecentlySelectedRole] = React.useState(null);
  const [selectedSubRole, setSelectedSubRole] = React.useState([]);
  const [selectedGender, setSelectedGender] = React.useState("");
  const dateMM = React.useRef(null);
  const dateDD = React.useRef(null);
  const dateYYYY = React.useRef(null);
  const [city, setCity] = React.useState("");
  const [errors, setErrors] = React.useState({
    gender: false,
    dd: false,
    mm: false,
    yyyy: false,
    cover: false,
    city: false,
    roles: false,
  });
  const history = useHistory();
  const userData = useSelector((state) => state?.userDetails?.user || {});

  React.useEffect(() => {
    dispatch(getRoles());
    dispatch(getUserDetails());
  }, []);

  const handleCoverDrop = React.useCallback(
    (files) => {
      if (!files?.length) {
        setSelectedCover(null);
        return;
      }

      if (files.length > 1) {
        toast.error("You can only upload one file");
        return;
      }

      const file = files[0];
      const name = file?.name?.toLowerCase();
      if (!name.endsWith(".png") && !name.endsWith(".jpg") && !name.endsWith(".jpeg")) {
        toast.error("Only image of type png, jpg, jpeg are allowed");
        return;
      }
      if (file.size / 1024 / 1024 >= 15) {
        toast.error("File size should be within 15mb");
        return;
      }

      setSelectedCover(file);
    },
    [setSelectedCover]
  );

  const handleGenderSelect = React.useCallback(
    (gender) => {
      setSelectedGender(gender);
      setErrors((pE) => ({ ...pE, gender: false }));
    },
    [setSelectedGender, setErrors]
  );

  const handleRoleSelect = React.useCallback(
    (roleItem) => {
      const isRoleSelected = selectedRole.includes(roleItem._id);
      if (isRoleSelected) {
        setSelectedRole(selectedRole.filter((el) => el !== roleItem._id));
        setRecentlySelectedRole(null);
        setSelectedSubRole(selectedSubRole.filter((el) => el.role_id !== roleItem._id));
      } else {
        if (selectedRole.length > 1) {
          toast.error("You can only select at max 2 role");
          return;
        }
        setSelectedRole((pR) => [...pR, roleItem._id]);
        setRecentlySelectedRole(roleItem);
      }
    },
    [selectedRole, selectedSubRole, setSelectedRole, setRecentlySelectedRole, setSelectedSubRole, toast]
  );

  const handleSubroleSelect = React.useCallback(
    (subroleItem) => {
      const isSubRoleSelected = selectedSubRole.find((el) => el._id === subroleItem._id);
      if (isSubRoleSelected) {
        setSelectedSubRole(selectedSubRole.filter((el) => el._id !== subroleItem._id));
      } else {
        setSelectedSubRole((pR) => [...pR, subroleItem]);
      }
    },
    [setSelectedSubRole, selectedSubRole]
  );

  const countSubroles = React.useCallback(
    (roleId) => {
      const filteredSubrole = selectedSubRole?.filter((el) => el?.role_id === roleId);
      return filteredSubrole?.length || 0;
    },
    [selectedSubRole]
  );

  const checkError = React.useCallback(() => {
    let hasError = false;
    if (!dateDD?.current?.value) {
      setErrors((pE) => ({ ...pE, dd: true }));
      hasError = true;
    } else setErrors((pE) => ({ ...pE, dd: false }));

    if (!dateMM?.current?.value) {
      setErrors((pE) => ({ ...pE, mm: true }));
      hasError = true;
    } else setErrors((pE) => ({ ...pE, mm: false }));

    if (!dateYYYY?.current?.value) {
      setErrors((pE) => ({ ...pE, yyyy: true }));
      hasError = true;
    } else setErrors((pE) => ({ ...pE, yyyy: false }));

    if((dateYYYY?.current?.value) && (dateMM?.current?.value) && (dateMM?.current?.value)){
      if(!isValidDOB(`${dateMM?.current?.value}/${dateDD?.current?.value}/${dateYYYY?.current?.value}`)){
        setErrors((pE) => ({ ...pE, yyyy: true,mm:true,dd:true}));
        hasError = true;
      }
    }

    if (selectedGender === ""){
      setErrors((pE) => ({ ...pE, gender: true }));
      hasError = true;
    } else setErrors((pE) => ({ ...pE, gender: false }));

    if (!selectedCover) {
      setErrors((pE) => ({ ...pE, cover: true }));
      hasError = true;
    } else setErrors((pE) => ({ ...pE, cover: false }));

    if (city === "") {
      setErrors((pE) => ({ ...pE, city: true }));
      hasError = true;
    } else setErrors((pE) => ({ ...pE, city: false }));

    if (!selectedRole?.length) {
      toast.dismiss();
      toast.error("Please select at-least one role");
      hasError = true;
    }

    return hasError;
  }, [setErrors, selectedGender, selectedCover, city, selectedRole]);

  const isValidDOB = (daterequested) => {      
      if(moment(daterequested).isValid()){
           return true
      }
      return false
  }

  const handleCity = React.useCallback(
    (val) => {
      setCity(val);
      setErrors((pE) => ({ ...pE, city: false }));
    },
    [setCity, setErrors]
  );

  const handleSubmit = React.useCallback(async () => {
    const payload = {
      listener_roles: selectedRole,
      listener_sub_roles: selectedSubRole.map((item) => item._id),
      gender: selectedGender.toLowerCase(),
      city: city,
      date_of_birth: `${dateYYYY.current.value}-${dateMM.current.value}-${dateDD.current.value}`,
    };

    if (checkError()) return "";

    try {
      await dispatch(updateUserData(payload));
      await uploadUserProfile(selectedCover, userData._id);
      await getUserDetails(true);
      history.push("/dashboard");
    } catch (err) {
      toast.error("Some error occured while saving details, please try again");
    }
  }, [selectedRole, selectedSubRole, selectedGender, city, checkError]);

  const handleOnDateChange = React.useCallback((field, event) => {
    if (event?.target?.value?.length >= 2) {
      if (field === "mm") dateDD.current.focus();
      if (field === "dd") dateYYYY.current.focus();
    }
  }, []);

  const handleOnEnterPressed = React.useCallback(
    (field, event, hasChanged = false) => {
      if (!hasChanged && event.which === 13) {
        if (field === "mm") dateDD.current.focus();
        if (field === "dd") dateYYYY.current.focus();
      }
      if (hasChanged) handleOnDateChange(field, event);
    },
    [handleOnDateChange]
  );

  return (
    <>
      <PersonalInfoComponent
        genderArray={genderArray}
        rolesList={rolesList}
        dateMMRef={dateMM}
        dateDDRef={dateDD}
        dateYYYYRef={dateYYYY}
        handleOnEnterPressed={handleOnEnterPressed}
        countSubroles={countSubroles}
        handleRoleSelect={handleRoleSelect}
        selectedRole={selectedRole}
        handleGenderSelect={handleGenderSelect}
        selectedGender={selectedGender}
        handleSubmit={handleSubmit}
        handleCity={handleCity}
        handleCoverDrop={handleCoverDrop}
        errors={errors}
        selectedCover={selectedCover}
      />
      <Drawer anchor="right" open={!!recentlySelectedRole} onClose={() => setRecentlySelectedRole(null)}>
        <FanRolesComponent
          handleSubroleSelect={handleSubroleSelect}
          selectedSubRole={selectedSubRole}
          selectedRole={recentlySelectedRole}
          handleClose={() => setRecentlySelectedRole(null)}
        />
      </Drawer>
    </>
  );
}
