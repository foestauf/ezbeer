import { ADD_INGREDIENT, SET_CURRENT_RECIPE } from './types';

export const setRecipe = (recipeId) => {
  return {
    type: SET_CURRENT_RECIPE,
    payload: recipeId,
  };
};

export const addIngredient = (payload) => {
  return {
    type: ADD_INGREDIENT,
    payload,
  };
};
