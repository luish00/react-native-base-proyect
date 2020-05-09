import Moment from 'moment';

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

// This function returns wether a value contains only numbers or not
export function testOnlyNumber(value) {
  const REGEX_NUMBER = /^-?\d+\.?\d*$/;

  return REGEX_NUMBER.test(value) || !value;
}

// This function returns wether a value contains only letters or not
export function testOnlyLetters(value) {
  const REGEX_LETTERS = /^[a-zA-Z\u00F1\u00D1\s]*$/;

  return REGEX_LETTERS.test(value) || !value;
}

// This function uses setTimeout but can be combined with await in an async
// function to wait for some time before continuing execution.
export function sleep(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

export function isValidEmail(mail) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(mail);
}

// For formats see https://momentjs.com/docs/#/displaying/
export function formatDate({ date, format }) {
  return Moment(date).format(format);
}
