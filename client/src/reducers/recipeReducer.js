import { SET_CURRENT_RECIPE, SET_RECIPE_NAME } from '../actions/types';

const initialState = {
  id: '',
  style: '',
  name: '',
  ingredients: [],
};

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
