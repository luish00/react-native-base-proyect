export function doNothing() {
  // Does exactly what it promises.
  // ... what is "nothing" anyway? https://bit.ly/2Hwo3Vj
}

/* eslint-disable no-bitwise */
export function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = ((dt + Math.random()) * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
  return uuid;
}
