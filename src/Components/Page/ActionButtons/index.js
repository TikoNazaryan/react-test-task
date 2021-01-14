import React from "react";
import { useDispatch } from "react-redux";
import {
  leftElementCondition,
  rightElementCondition,
  singleElementCondition,
  middleElementCondition,
  getBottomLine,
} from "./../../../Helpers";
import {
  addPage,
  expendPage,
  setActivePage,
  removePage,
} from "../../../Store/actions";

const ActionButtons = ({
  page,
  pages,
  current_path,
  index,
  isActive,
  isLast,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      {leftElementCondition(pages, current_path, index) && (
        <>
          <div className="left-line"></div>
          <div
            className="action-btn add-page-from-left"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setActivePage({ current_path: null }));
              dispatch(
                addPage({
                  position: "left",
                  current_path,
                })
              );
            }}
          >
            +
          </div>
        </>
      )}
      {rightElementCondition(pages, current_path, index) && (
        <>
          <div className="right-line"></div>
          <div
            className="action-btn add-page-from-right"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setActivePage({ current_path: null }));
              dispatch(
                addPage({
                  position: "right",
                  current_path,
                })
              );
            }}
          >
            +
          </div>
        </>
      )}
      {singleElementCondition(pages, current_path) && (
        <div
          className="action-btn add-page-from-left"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setActivePage({ current_path: null }));
            dispatch(
              addPage({
                position: "left",
                current_path,
              })
            );
          }}
        >
          +
        </div>
      )}
      {isLast ? (
        <div
          className="action-btn add-page-child"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              addPage({
                position: "child",
                current_path,
              })
            );
          }}
        >
          +
        </div>
      ) : (
        <div
          className="action-btn expand"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(expendPage({ current_path }));
          }}
        ></div>
      )}
      {(middleElementCondition(pages, current_path, index) ||
        singleElementCondition(pages, current_path)) && (
        <div className="middle-line"></div>
      )}
      {getBottomLine(isLast, page)}
      {isActive && (
        <div
          className="action-btn remove-page"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setActivePage({ current_path: null }));
            dispatch(removePage({ current_path, index }));
          }}
        >
          +
        </div>
      )}
    </>
  );
};

export default ActionButtons;
