import { SET_CURRENT_RECIPE } from '../actions/types';

const initialState = {};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_RECIPE:
      return {
        ...state,
        id: action.payload._id,
        style: action.payload.style,
        name: action.payload.name,
        ingredients: action.payload.ingredients,
      };
    default:
      return state;
  }
};

export default recipeReducer;
