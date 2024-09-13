

import { useQuery } from 'react-query';
import { getCars } from '../api';
import { Car } from '../interface/car';


export const useCar = () =>
  useQuery<Car[]>(
    ['getTasks'],
    getCars,
  );