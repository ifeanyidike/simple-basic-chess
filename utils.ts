export enum keys {
  pB = "pB",
  rB = "rB",
  nB = "nB",
  bB = "bB",
  qB = "qB",
  kB = "kB",
  pW = "pW",
  rW = "rW",
  nW = "nW",
  bW = "bW",
  qW = "qW",
  kW = "kW",
  empty = "",
}

export const PIECES: { [key: string]: string } = {
  [keys.pB]: "&#9823;",
  [keys.rB]: "&#9820;",
  [keys.nB]: "&#9822;",
  [keys.bB]: "&#9821;",
  [keys.qB]: "&#9819;",
  [keys.kB]: "&#9818;",
  [keys.pW]: "&#9817;",
  [keys.rW]: "&#9814;",
  [keys.nW]: "&#9816;",
  [keys.bW]: "&#9815;",
  [keys.qW]: "&#9813;",
  [keys.kW]: "&#9812;",
};

export enum params {
  numRows = 8, //numRows = numCols = 8
  firstRank = 0,
  secondRank = 1,
  seventhRank = 6,
  eighthRank = 7,
  white = "W",
  black = "B",
}
