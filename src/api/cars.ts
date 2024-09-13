import { get } from "./method";


export const getCars = () =>
  get('/cars').then((res) => res);