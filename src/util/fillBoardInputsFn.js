export function fillBoardInputsFn(setTitle, setColumns, editBoard) {
  let board = JSON.parse(localStorage.getItem(editBoard));
  if (board) {
    setTitle(editBoard);
    let columnsArray = Object.keys(board);

    for (let i = 0; i < columnsArray.length; i++) {
      columnsArray[i] = JSON.parse(columnsArray[i]);
      columnsArray[i].prev = columnsArray[i].current;
    }
    setColumns(columnsArray);
  }
}
