import React from "react";
import { useDispatch } from "react-redux";
import {
  changePageName,
  changeBlockName,
  removeBlock,
  addBlock,
} from "./../../../Store/actions";
import { Droppable, Draggable } from "react-beautiful-dnd";
import classnames from "classnames";

const Content = ({ page, current_path, isActive }) => {
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    dispatch(changePageName({ current_path, value: e.target.value }));
  };

  const handleBlockNameChange = (e, index) => {
    dispatch(changeBlockName({ current_path, value: e.target.value, index }));
  };

  const handleBlockRemove = (index) => {
    dispatch(removeBlock({ current_path, index }));
  };

  const handleAddBlock = () => {
    dispatch(addBlock({ current_path }));
  };

  return (
    <div className="content">
      <div className="page-title">
        <input type="text" value={page.name} onChange={handleNameChange} />
      </div>
      <Droppable droppableId={current_path}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {page.blocks.map((block, index) => {
              return (
                <Draggable
                  key={index}
                  draggableId={current_path + "_" + index}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        className={classnames("block-name-container", {
                          dragging: snapshot.isDragging,
                        })}
                      >
                        {isActive ? (
                          <>
                            <input
                              type="text"
                              value={block}
                              onChange={(e) => handleBlockNameChange(e, index)}
                            />
                            <div
                              className="action-btn remove-block"
                              onClick={() => handleBlockRemove(index)}
                            >
                              +
                            </div>
                          </>
                        ) : (
                          <div className="block-name">{block}</div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isActive && (
        <div className="action-btn add-block" onClick={handleAddBlock}>
          +
        </div>
      )}
    </div>
  );
};

export default Content;
