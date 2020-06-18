import { SET_CURRENT_RECIPE } from '../actions/types';

const initialState = {
  recipe: ''
}

const recipeReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_CURRENT_RECIPE:
      return {
        ...state,
        recipe: action.payload._id,
        style: action.payload.style,
        name: action.payload.name
      };
    default: return state;
  }
}

export default recipeReducer