// config.ts
import config from '../data/config.json';

export const getNameMinCharacters = (): number => {
  return config.name.minCharacters;
};
export const getNameMaxCharacters = (): number => {
  return config.name.maxCharacters;
};
export const getRandomString=(len:number)=> {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
export interface User {
  id?: string;
  name: string;
  email: string;
  linkedinUrl: string;
  gender:string;
  address: {
    line1: string;
    line2: string;
    state: string;
    city: string;
    pin: string;
  };
}
