import { ACTIONS } from "./../../Constants";

export const addPage = (payload) => {
  return {
    type: ACTIONS.ADD_PAGE,
    payload,
  };
};

export const removePage = (payload) => {
  return {
    type: ACTIONS.REMOVE_PAGE,
    payload,
  };
};

export const expendPage = (payload) => {
  return {
    type: ACTIONS.EXPEND_PAGE,
    payload,
  };
};

export const setActivePage = (payload) => {
  return {
    type: ACTIONS.SET_ACTIVE_PAGE,
    payload,
  };
};

export const dragAndDrop = (payload) => {
  return {
    type: ACTIONS.DRAG_AND_DROP,
    payload,
  };
};

export const changePageName = (payload) => {
  return {
    type: ACTIONS.CHANGE_PAGE_NAME,
    payload,
  };
};

export const addBlock = (payload) => {
  return {
    type: ACTIONS.ADD_BLOCK,
    payload,
  };
};

export const changeBlockName = (payload) => {
  return {
    type: ACTIONS.CHANGE_BLOCK_NAME,
    payload,
  };
};

export const removeBlock = (payload) => {
  return {
    type: ACTIONS.REMOVE_BLOCK,
    payload,
  };
};
