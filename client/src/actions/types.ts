
export const GET_ERRORS = 'GET_ERRORS';
export const USER_LOADING = 'USER_LOADING';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_RECIPE = 'SET_CURRENT_RECIPE';
export const SET_RECIPE_NAME = 'SET_RECIPE_NAME';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export interface Decode {
  auth: object,
  errors: object,
  recipe: object,
  exp?: number
}

interface SetCurrentUser {
  type: typeof SET_CURRENT_USER,
  payload: Decode
}

interface SetUserLoading {
  type: typeof USER_LOADING
}

export type AuthActionTypes = SetUserLoading | SetCurrentUser