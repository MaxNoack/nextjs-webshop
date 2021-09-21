export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const initialState = {
  cartItems: {},
};

const addProductToCart = (cart, product) => {
  const key = product.id;
  const currentCount = cart[key]?.count || 0;
  return {
    ...cart,
    [key]: {
      ...(currentCount ? cart[key] : product),
      count: currentCount + 1,
    },
  };
};

const removeProductFromCart = (cart, product) => {
  const key = product.id;
  const currentCount = cart[key]?.count || 0;
  if (currentCount > 1) {
    return {
      ...cart,
      [key]: {
        ...cart[key],
        count: cart[key].count - 1,
      },
    };
  }
  const { [key]: productToRemove, ...newCart } = cart;
  return newCart;
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addProductToCart(state.cartItems, action.product),
      };

    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeProductFromCart(state.cartItems, action.product),
      };

    default:
      return { ...state };
  }
};

export const addItem = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_ITEM,
      product,
    });
  };
};

export const removeItem = (product) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ITEM,
      product,
    });
  };
};
