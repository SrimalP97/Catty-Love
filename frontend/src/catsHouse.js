import { createContext, useReducer } from 'react';

export const catsHouse = createContext();

const initialState = {
  wishlist: {
    wishlistItems: localStorage.getItem('wishlistItems')
      ? JSON.parse(localStorage.getItem('wishlistItems'))
      : [],
  },
};


function reducer(state, action) {
  switch (action.type) {
    case 'WISHLIST_ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.wishlist.wishlistItems.find(
        (item) => item._id === newItem._id
      );
      const wishlistItems = existItem
        ? state.wishlist.wishlistItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.wishlist.wishlistItems, newItem];
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
      return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
    case 'WISHLIST_REMOVE_ITEM': {
      const wishlistItems = state.wishlist.wishlistItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
      return { ...state, wishlist: { ...state.wishlist, wishlistItems } };
/*     }
    default:
      return state; */
  }
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

export function CatsHouseProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <catsHouse.Provider value={value}>{props.children} </catsHouse.Provider>;
  
}
