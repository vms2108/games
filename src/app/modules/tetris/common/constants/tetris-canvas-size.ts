import { LEVEL } from './../models/level';

export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 20;
export const LINES_PER_LEVEL = 10;
export const COLORS = [
  'none',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red',
];
export const SHAPES = [
  [],
  [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
  [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
  [[4, 4], [4, 4]],
  [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
  [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
  [[7, 7, 0], [0, 7, 7], [0, 0, 0]],
];

export const COLORSLIGHTER = [
  'none',
  'rgba(132, 255, 255)',
  'rgba(132, 132, 255)',
  'rgba(255, 195, 132)',
  'rgba(255, 255, 132)',
  'rgba(132, 255, 132)',
  'rgba(255, 132, 255)',
  'rgba(255, 132, 132)',
];
export const COLORSDARKER = [
  'none',
  'rgba(0, 132, 132)',
  'rgba(0, 0, 132)',
  'rgba(132, 65, 0)',
  'rgba(132, 132, 0)',
  'rgba(0, 132, 0)',
  'rgba(132, 0, 132)',
  'rgba(132, 0, 0)',
];

export class KEY {
  public static readonly ESC = 27;
  public static readonly SPACE = 32;
  public static readonly LEFT = 37;
  public static readonly UP = 38;
  public static readonly RIGHT = 39;
  public static readonly DOWN = 40;
}

export class POINTS {
  public static readonly SINGLE = 100;
  public static readonly DOUBLE = 300;
  public static readonly TRIPLE = 500;
  public static readonly TETRIS = 800;
  public static readonly SOFT_DROP = 1;
  public static readonly HARD_DROP = 2;
}

export const LEVELS: LEVEL[] = [
  new LEVEL(0, 800),
  new LEVEL(1, 720),
  new LEVEL(2, 630),
  new LEVEL(3, 550),
  new LEVEL(4, 470),
  new LEVEL(5, 380),
  new LEVEL(6, 300),
  new LEVEL(7, 220),
  new LEVEL(8, 130),
  new LEVEL(9, 100),
  new LEVEL(10, 80),
  new LEVEL(11, 80),
  new LEVEL(12, 80),
  new LEVEL(13, 70),
  new LEVEL(14, 70),
  new LEVEL(15, 70),
  new LEVEL(16, 50),
  new LEVEL(17, 50),
  new LEVEL(18, 50),
  new LEVEL(19, 30),
  new LEVEL(20, 30),
];
