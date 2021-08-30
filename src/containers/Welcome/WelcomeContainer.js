import React from 'react';
import { connect } from "react-redux";
import WelcomeComponent from './../../components/Welcome/WelcomeComponent';
import { uploadUserProfile, getUserDetails } from "../../state/actions/userActions";
import { toast } from "react-toastify";

class WelcomeContainer extends React.Component {

    componentDidMount() {
        const {
            getUserDetailsDispatchAction,
        } = this.props;
        getUserDetailsDispatchAction();
    }

    handleOnClickContinue = () => {
        this.props.history.push("/onboarding");
    }

    handleProfileUpload = (e) => {
        if (e ?.target ?.files ?.length > 0) {
            if (e.target.files[0].size / 1024 / 1024 >= 10) {
                toast.error("File size should be within 10mb");
                return;
            }
            uploadUserProfile(e.target.files[0], this.props.user._id).then((res) => {
                if (res.ok) {
                    toast.success("Profile Image Updated");
                    this.props.getUserDetailsDispatchAction();
                    setTimeout(() => this.forceUpdate(), 10000);
                } else {
                    toast.error("Failed to upload profile image");
                }
            });
        }
    }

    render() {
        return (
            <WelcomeComponent
                user={this.props.user}
                handleOnClickContinue={this.handleOnClickContinue}
                handleProfileUpload={this.handleProfileUpload}
            />
        )
    }

}

const mapStateToProps = (state) => {
    const targetState = state.userDetails || {};

    return {
        user: targetState.user || {},
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUserDetailsDispatchAction: () => dispatch(getUserDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);