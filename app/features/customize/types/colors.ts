export const Colors = {
  Green: 'lime',
  Blue: 'mediumslateblue',
  Pink: 'hotpink',
} as const;
export type Colors = (typeof Colors)[keyof typeof Colors];
