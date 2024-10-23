import PropTypes from "prop-types";
import { GadgetBase } from "./GadgetBase"
import { UserProfile } from "../components/UserProfile.jsx";

export const GadgetUserProfile = ({ userProgress = null }) => {
  return (
    <GadgetBase frame = {false} >
      <UserProfile
        level={userProgress ? userProgress.level : 0}
        levelProgress={userProgress ? userProgress.level_progress : 0} 
      />
    </GadgetBase>
  )
}

GadgetUserProfile.propTypes = {
  userProgress: PropTypes.object,
};