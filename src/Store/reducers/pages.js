import {
  ACTIONS,
  INITIAL_PAGE_NAME,
  INITIAL_PAGE_EXPENDED,
  INITIAL_PAGE_PAGES,
  INITIAL_PAGE_BLOCKS,
} from "./../../Constants";
import { getPathLength, isPageAction } from "./../../Helpers";

const pagesReducer = (
  state = [
    {
      name: "Main",
      expanded: true,
      blocks: [],
      pages: [
        {
          name: "First",
          expanded: true,
          blocks: ["Block"],
          pages: [],
        },
        {
          name: "Second",
          expanded: true,
          blocks: [],
          pages: [
            {
              name: "Page",
              expanded: true,
              blocks: ["Block", "Block"],
              pages: [
                {
                  name: "Page",
                  expanded: true,
                  blocks: [],
                  pages: [],
                },
              ],
            },
          ],
        },
        {
          name: "Third",
          expanded: true,
          blocks: [],
          pages: [
            {
              name: "Page",
              expanded: true,
              blocks: [],
              pages: [
                {
                  name: "Page ",
                  expanded: false,
                  blocks: [],
                  pages: [
                    {
                      name: "Page",
                      expanded: true,
                      blocks: [],
                      pages: [],
                    },
                  ],
                },
              ],
            },
            {
              name: "Page",
              expanded: true,
              blocks: ["Block", "Block", "Block"],
              pages: [],
            },
          ],
        },
      ],
    },
  ],
  action
) => {
  if (isPageAction(action.type)) {
    const { current_path: path_ } = action.payload;
    let path = [0];
    if (path_ !== "0") path = path_.split(".");

    let stateClone = [...state];
    let stateLinked = stateClone;
    for (let i = 0; i < getPathLength(action, path); i++) {
      if (i === 0) stateLinked = stateLinked[path[i]];
      else stateLinked = stateLinked.pages[path[i]];
    }

    switch (action.type) {
      case ACTIONS.ADD_PAGE:
        switch (action.payload.position) {
          case "left":
            stateLinked.pages.unshift({
              name: INITIAL_PAGE_NAME,
              expanded: INITIAL_PAGE_EXPENDED,
              blocks: [...INITIAL_PAGE_BLOCKS],
              pages: [...INITIAL_PAGE_PAGES],
            });
            break;
          case "right":
            stateLinked.pages.push({
              name: INITIAL_PAGE_NAME,
              expanded: INITIAL_PAGE_EXPENDED,
              blocks: [...INITIAL_PAGE_BLOCKS],
              pages: [...INITIAL_PAGE_PAGES],
            });
            break;
          case "child":
            stateLinked.pages.push({
              name: INITIAL_PAGE_NAME,
              expanded: INITIAL_PAGE_EXPENDED,
              blocks: [...INITIAL_PAGE_BLOCKS],
              pages: [...INITIAL_PAGE_PAGES],
            });
            break;
          default:
            return state;
        }
        return stateClone;
      case ACTIONS.REMOVE_PAGE:
        if (action.payload.path === "0") return [];
        stateLinked.pages.splice(action.payload.index, 1);
        return stateClone;
      case ACTIONS.EXPEND_PAGE:
        stateLinked.expanded = !stateLinked.expanded;
        return stateClone;
      case ACTIONS.DRAG_AND_DROP:
        const { destination, source } = action.payload;

        let sourcePath = [0];
        if (source.droppableId !== "0")
          sourcePath = source.droppableId.split(".");

        let stateLinked_ = stateClone;
        for (let i = 0; i < sourcePath.length; i++) {
          if (i === 0) stateLinked_ = stateLinked_[sourcePath[i]];
          else stateLinked_ = stateLinked_.pages[sourcePath[i]];
        }
        const blocks = stateLinked_.blocks[source.index];
        stateLinked_.blocks.splice(source.index, 1);
        stateLinked.blocks.splice(destination.index, 0, blocks);
        return stateClone;
      case ACTIONS.CHANGE_PAGE_NAME:
        stateLinked.name = action.payload.value;
        return stateClone;
      case ACTIONS.CHANGE_BLOCK_NAME:
        stateLinked.blocks[action.payload.index] = action.payload.value;
        return stateClone;
      case ACTIONS.REMOVE_BLOCK:
        stateLinked.blocks.splice(action.payload.index, 1);
        return stateClone;
      case ACTIONS.ADD_BLOCK:
        stateLinked.blocks.push("New Block");
        return stateClone;
      default:
        return state;
    }
  }
  return state;
};
export default pagesReducer;
