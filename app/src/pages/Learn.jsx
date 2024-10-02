import { useEffect } from "react";
import { setPageTitle } from "../utils/utils";

export const Learn = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, []);
  return <h1>Learning page</h1>;
};
