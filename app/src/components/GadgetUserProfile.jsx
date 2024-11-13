import PropTypes from "prop-types";
import { GadgetBase } from "./GadgetBase";
import { UserProfile } from "../components/UserProfile.jsx";

export const GadgetUserProfile = ({ userInfo = {} }) => {
  return (
    <GadgetBase frame={false} sx={{ border: 0 }}>
      <UserProfile
        username={userInfo ? userInfo.name : ""}
        profilePicture={userInfo ? userInfo.picture : ""}
        level={userInfo ? userInfo.progress?.level : 0}
        levelProgress={userInfo ? userInfo.progress?.level_progress : 0}
      />
    </GadgetBase>
  );
};

GadgetUserProfile.propTypes = {
  userInfo: PropTypes.object,
};
