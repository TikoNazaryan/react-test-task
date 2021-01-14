import { ACTIONS } from "./../../Constants";

const activeReducer = (state = null, action) => {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_PAGE:
      return action.payload.current_path;
    default:
      return state;
  }
};

export default activeReducer;
