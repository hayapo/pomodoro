export const Colors = {
  Red: 'red',
  Green: 'green',
  Blue: 'blue',
  Pink: 'pink',
} as const;
export type Colors = (typeof Colors)[keyof typeof Colors];
