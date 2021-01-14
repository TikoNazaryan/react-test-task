import { ACTIONS } from "./../Constants";

export const getPathLength = (action, path) => {
  if (
    (action.type === ACTIONS.ADD_PAGE &&
      (action.payload.position === "left" ||
        action.payload.position === "right")) ||
    action.type === ACTIONS.REMOVE_PAGE
  )
    return path.length - 1;
  else return path.length;
};

export const getBottomLine = (isLast, page) => {
  if (!isLast && page.expanded) {
    if (page.pages.length <= 1) return <div className="bottom-line"></div>;
    else
      return (
        <div className="bottom-line-curved">
          <div className="left"></div>
          <div className="right"></div>
        </div>
      );
  }

  return null;
};

export const isPageAction = (type) => {
  if (
    type === ACTIONS.ADD_PAGE ||
    type === ACTIONS.REMOVE_PAGE ||
    type === ACTIONS.EXPEND_PAGE ||
    type === ACTIONS.DRAG_AND_DROP ||
    type === ACTIONS.CHANGE_PAGE_NAME ||
    type === ACTIONS.CHANGE_BLOCK_NAME ||
    type === ACTIONS.REMOVE_BLOCK ||
    type === ACTIONS.ADD_BLOCK
  )
    return true;
  else return false;
};

export const leftElementCondition = (pages, current_path, index) =>
  index === 0 && pages.length > 1 && current_path !== "0";

export const rightElementCondition = (pages, current_path, index) =>
  index === pages.length - 1 && index !== 0 && current_path !== "0";

export const singleElementCondition = (pages, current_path) =>
  pages.length === 1 && current_path !== "0";

export const middleElementCondition = (pages, current_path, index) =>
  index !== 0 && index < pages.length - 1 && current_path !== "0";
