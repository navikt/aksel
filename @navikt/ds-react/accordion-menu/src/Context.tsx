import React, { createContext, useContext, useReducer, Dispatch } from "react";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface Position {
  y: number;
}

export interface Anchor {
  id: string;
  position: Position;
}

export interface Store {
  activeAnchor?: string;
  anchors?: Anchor[];
}

export type Action =
  | {
      type: "INSERT_ANCHOR";
      id: string;
      position;
    }
  | {
      type: "SET_ACTIVE_ANCHOR";
      id?: string;
    };

const initialState = {
  anchors: [],
};

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "INSERT_ANCHOR":
      return {
        ...state,
        anchors: [
          ...state.anchors,
          { id: action.id, position: action.position },
        ],
      };
    case "SET_ACTIVE_ANCHOR":
      return {
        ...state,
        activeAnchor: action.id,
      };
    default:
      return state;
  }
};

export const StoreContext = createContext({} as [Store, Dispatch<Action>]);
export const StoreProvider = (props: Props) => {
  const { children } = props;

  return (
    <StoreContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
