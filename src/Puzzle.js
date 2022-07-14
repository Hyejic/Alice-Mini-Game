import { useState, useRef, useEffect } from "react";
import "./puzzle.scss";

function Puzzle() {
  // setting
  const [isStart, setStart] = useState(false);
  const [isCount, setCount] = useState(false);
  const [waitingCount, setWaitingCount] = useState(5);
  const tileLength = 16;

  // 완성된 퍼즐 Array
  let tiles = [];
  tiles = Puzzletiles();

  // 섞인 퍼즐 타일
  function Shuffletiles() {
    let shuffleTilesArray = [];
    shuffle(tiles).forEach((tile, index) => {
      shuffleTilesArray.push(
        <div
          className={"puzzle__tile tile" + tile.key}
          data-index={tile.key}
          onClick={handleClick}
          key={index}
        ></div>
      );
    });
    return shuffleTilesArray;
  }

  // create puzzle tile
  function Puzzletiles() {
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
    // clear();
    let index = array.length - 1;
    while (index > 0) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
      index--;
    }
    return array;
  }

  //event
  const beforeEl = {
    el: null,
    class: null,
    index: null,
  };
  const afterEl = {
    el: null,
    class: null,
    index: null,
  };

  function handleClick(e) {
    const obj = e.target;

    if(beforeEl.el !== null && !obj.classList.contains("on")) {
      afterEl.el = obj;
      afterEl.class = obj.className;
      afterEl.index = [...obj.parentNode.children].indexOf(obj);
    } else {
      beforeEl.el = obj;
      beforeEl.class = obj.className;
      beforeEl.index = [...obj.parentNode.children].indexOf(obj);
      obj.classList.add("on");
    }

    console.log("beforeEl", beforeEl);
    console.log("afterEl", afterEl);
    console.log("-------------------------------------");
  }
  // console.log(containerRef);
  useEffect(() => {
    // containerRef.addEventListener("click", (e) => {
    //   const obj = e.target;
    //   console.log(obj);
    //   // dragged.el = obj;
    //   // dragged.el = obj;
    // });
  }, []);

  const setGame = () => {
    setStart(true);
    setTimeout(() => {
      setCount(true);
    }, 5000);
  };

  // 대기화면
  const Waitng = () => {
    return (
      <div className="wait">
        <p>
          start 버튼을 눌러주세요. <span>5초후 시작</span>
        </p>
      </div>
    );
  };

  return (
    <div className="puzzle">
      <p className="puzzle__time">0</p>
      <div className="puzzle__board">
        {/* {isStart ? isCount ? <Shuffletiles /> : <Puzzletiles /> : <Waitng />} */}
        <Shuffletiles />
      </div>
      <button className="puzzle__btn" onClick={setGame}>
        <span>Start</span>
      </button>
    </div>
  );
}

export default Puzzle;
