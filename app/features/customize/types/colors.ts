export const Colors = {
  Green: 'lime',
  Blue: 'mediumSlateBlue',
  Pink: 'hotPink',
} as const;
export type Colors = (typeof Colors)[keyof typeof Colors];
