import { GadgetBase } from "./GadgetBase"
import { UserProfile } from "../components/UserProfile.jsx";

export const GadgetUserProfile = () => {
  return (
    <GadgetBase frame = {false} >
      <UserProfile />
    </GadgetBase>
  )
}