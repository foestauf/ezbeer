import { ADD_INGREDIENT, SET_CURRENT_RECIPE, UPDATE_INGREDIENT } from './types';

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

export const updateIngredient = (payload) => {
  return {
    type: UPDATE_INGREDIENT,
    payload,
  };
};
