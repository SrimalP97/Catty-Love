import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  wishlist: {
    wishlistItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'WISHLIST_ADD_ITEM':
      // add to Wishlist
      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          wishlistItems: [...state.wishlist.wishlistItems, action.payload],
        },
      };

    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
