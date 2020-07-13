import { SET_CURRENT_RECIPE, SET_RECIPE_NAME, ADD_INGREDIENT } from '../actions/types';

const initialState = {};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_RECIPE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_RECIPE_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    default:
      return state;
  }
};

export default recipeReducer;
