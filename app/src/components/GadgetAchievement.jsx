import PropTypes from "prop-types";
import { GadgetBase } from './GadgetBase';
import { WallOfFame } from './WallOfFame';


export const GadgetAchievement = ({ userInfo = {} }) => {  
  return (
    <GadgetBase>
      <WallOfFame userInfo={userInfo} />
    </GadgetBase>
  );
};

GadgetAchievement.propTypes = {
  userInfo: PropTypes.object,
};