import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage, dragAndDrop } from "./../../Store/actions";
import { DragDropContext } from "react-beautiful-dnd";
import Page from "../Page";
import "./styles.scss";

const Wrapper = () => {
  const pages = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const handleBodyClick = () => dispatch(setActivePage({ current_path: null }));
  useEffect(() => {
    document.addEventListener("click", handleBodyClick);
    return () => {
      document.removeEventListener("click", handleBodyClick);
    };
  });

  const onDragEnd = ({ destination, source }) => {
    if (destination !== null)
      dispatch(
        dragAndDrop({
          current_path: destination.droppableId,
          destination,
          source,
        })
      );
  };

  return (
    <div id="wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <Page pages={pages} path="start" />
      </DragDropContext>
    </div>
  );
};

export default Wrapper;
