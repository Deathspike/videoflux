import {Ref} from './Ref';

export const Data = {
  type: 'object',
  properties: {
    movieFile: Ref,
    series: Ref
  }
} as const;
