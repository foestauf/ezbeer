import { SET_CURRENT_RECIPE } from './types';


export const setRecipe = (recipeId) => {
  return {
    type: SET_CURRENT_RECIPE,
    payload: recipeId
  }
}
