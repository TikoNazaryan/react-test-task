import React from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../../Store/actions";
import {
  leftElementCondition,
  rightElementCondition,
  singleElementCondition,
  middleElementCondition,
} from "./../../Helpers";
import ActionButtons from "./ActionButtons";
import Content from "./Content";

const Page = ({ pages, path }) => {
  const dispatch = useDispatch();
  const activePage = useSelector((store) => store.active);

  const getPageContent = (index, page, current_path, isLast) => {
    const isActive = activePage && activePage === current_path;
    return (
      <div
        className={classnames("row", {
          "middle-element": middleElementCondition(pages, current_path, index),
          "single-element": singleElementCondition(pages, current_path),
          "single-middle-element":
            middleElementCondition(pages, current_path, index) &&
            pages.length === 3,
          "left-element": leftElementCondition(pages, current_path, index),
          "right-element": rightElementCondition(pages, current_path, index),
        })}
      >
        <div
          className={classnames("page", { active: isActive })}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setActivePage({ current_path }));
          }}
        >
          <ActionButtons
            page={page}
            pages={pages}
            current_path={current_path}
            index={index}
            isActive={isActive}
            isLast={isLast}
          />
          <Content
            page={page}
            current_path={current_path}
            isActive={isActive}
          />
          {!page.expanded && (
            <div className="expended-borders">
              <div className="expended-border"></div>
              <div className="expended-border"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {pages.map((page, index) => {
        const current_path = path === "start" ? "0" : path + "." + index;
        return (
          <div className="column" data={current_path} key={current_path}>
            {page.pages.length === 0 ? (
              getPageContent(index, page, current_path, true)
            ) : (
              <>
                {getPageContent(index, page, current_path, false)}
                {page.expanded && (
                  <div className="row">
                    <Page pages={page.pages} path={current_path} />
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Page;
