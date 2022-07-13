import "./puzzle.scss";

function Puzzle() {
  // setting
  const tileLength = 16;

  // 완성된 퍼즐 Array
  let tiles = [];
  tiles = puzzleTiles();

  // 섞인 퍼즐 타일
  function Shuffletiles() {
    let shuffleTilesArray = [];
    shuffle(tiles).forEach((tile, index) => {
      shuffleTilesArray.push(
        <div
          className={"puzzle__tile tile" + tile.key}
          data-index={tile.key}
          key={index}
        ></div>
      );
    });
    return shuffleTilesArray;
  }

  // create puzzle tile
  function puzzleTiles() {
    let puzzleTilesArray = [];
    for (let i = 1; i <= tileLength; i++) {
      puzzleTilesArray.push(
        <div className={"puzzle__tile tile" + i} data-index={i} key={i}></div>
      );
    }
    return puzzleTilesArray;
  }

  // 퍼즐 섞기
  function shuffle(array) {
    let index = array.length - 1;
    while (index > 0) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
      index--;
    }
    return array;
  }

  //setGame
  const setGame = () => {
    console.log("hi");
  };

  setGame();

  return (
    <div className="puzzle">
      <p className="puzzle__time">0</p>
      <div className="puzzle__board">
        <Shuffletiles />
      </div>
      <button className="puzzle__btn">
        <span>Start</span>
      </button>
    </div>
  );
}

export default Puzzle;
