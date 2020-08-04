export const loadState = (): object | undefined => {
  try {
    const serializedState = sessionStorage.getItem('state');

    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: object): void => {
  console.log(state);
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (error) {
    // Ignore write errors
  }
};
