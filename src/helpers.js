//export means this functions will be used in other files
//nestedArray function is the same name as makeMineSweeperMap()
//The nestedArray() func takes two parameters, row and col, which define the dimensions of the nested array.
export function nestedArray(row: number, col: number) {
  let outerArray: Array<Array<number | string>> = [];
  for (let i = 0; i < row; i++) {
    let innerArray: Array<number | string> = [];
    for (let j = 0; j < col; j++) {
      innerArray.push("");
    }
    outerArray.push(innerArray);
  }
  return outerArray;
}
//populatesNestedArray populates the map with bombs
//The populateNestedArray function takes 3 arguments, nestedArray (the map), val (value to add to the map), and count (the number of values to add to the map).
export function populateNestedArray(
  nestedArray: Array<Array<number | string>>,
  val: string | number,
  count: number
) {
  let rows = nestedArray.length;
  let cols = nestedArray[0].length;
  while (count) {
    let y = floorRand(rows);
    let x = floorRand(cols);
    if (!nestedArray[y][x]) {
      nestedArray[y][x] = val;
      count--;
    }
  }
  return nestedArray;
}
//determines the number value of the adjacent cells. valsAdjacentCounts() takes two parameters, nestedArray and val (the value of the bomb). This function iterates through the nested array.
export function valsAdjacentCounts(
  nestedArray: Array<Array<number | string>>,
  val: string | number
) {
  for (let i = 0; i < nestedArray.length; i++) {
    for (let j = 0; j < nestedArray[0].length; j++) {
      if (nestedArray[i][j] === val) {
        nestedArray = addOneNestedArrAdjacents(nestedArray, i, j, val);
      }
    }
  }
  return nestedArray;
}

function addOneNestedArrAdjacents(
  nestedArray: Array<Array<number | string>>,
  i: number,
  j: number,
  val: string | number
) {
  let iList = [i - 1, i, i + 1];
  let jList = [j - 1, j, j + 1];
  for (let a of iList) {
    if (nestedArray[a]) {
      for (let b of jList) {
        if (nestedArray[a][b] !== undefined && nestedArray[a][b] !== val) {
          if (typeof nestedArray[a][b] !== "number") nestedArray[a][b] = 0;
          nestedArray[a][b]++;
        }
      }
    }
  }
  return nestedArray;
}
//This function returns the populated nested array
//☀ represent the bombs on the map
function floorRand(scale: number) {
  return Math.floor(Math.random() * scale);
}