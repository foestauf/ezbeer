import { SET_CURRENT_RECIPE, SET_RECIPE_NAME } from '../actions/types';

const initialState = {};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_RECIPE:
      return {
        // ...state,
        ...action.payload,
      };
    case SET_RECIPE_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export default recipeReducer;
