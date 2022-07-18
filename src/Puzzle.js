import { useState, useRef, useEffect } from "react";
import "./puzzle.scss";

function Puzzle() {
  // setting
  const [isStart, setStart] = useState(false);
  const [isCount, setCount] = useState(false);
  const [waitingTime, setWaitingTime] = useState(5);
  const tileLength = 16;

  // 완성된 퍼즐 Array
  let tiles = [];
  tiles = Puzzletiles();

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

    if(beforeEl.el === null && !obj.classList.contains("on")) {
        beforeEl.el = obj; 
        beforeEl.class = obj.className;
        beforeEl.index = [...obj.parentNode.children].indexOf(obj);
        obj.classList.add("on");
    } else {      
      afterEl.el = obj;
      afterEl.class = obj.className;
      afterEl.index = [...obj.parentNode.children].indexOf(obj);
      beforeEl.el.classList.remove("on");
      
      if(afterEl.class !== beforeEl.class) {    
        let originPlace;
        let isLast = false;

        if(beforeEl.el.nextSibling) {
          originPlace = beforeEl.el.nextSibling;
        } else {
          originPlace = beforeEl.el.previousSibling;
          isLast = true;
        }
        console.log(originPlace);
        
        afterEl.index < beforeEl.index ?  afterEl.el.before(beforeEl.el)  : afterEl.el.after(beforeEl.el);
        isLast ? originPlace.after(afterEl.el) : originPlace.before(afterEl.el);

        console.log("beforeEl", beforeEl);
        console.log("afterEl", afterEl);
        console.log("-------------------------------------");  
      }

      checkStatus();

      beforeEl.el = null;
      beforeEl.class = null;
      beforeEl.index = null;
      afterEl.el = null;
      afterEl.class = null;
      afterEl.index = null;
    }


  }

  useEffect(() => {
    // containerRef.addEventListener("click", (e) => {
      //   const obj = e.target;
      //   console.log(obj);
      //   // dragged.el = obj;
      //   // dragged.el = obj;
      // });
      
      // const currentList = [...containerRef];
      
    }, []);
    
  const containerRef = useRef();
  function checkStatus() {
    const currentList = [...containerRef.current.children];
    const unMatchedList = currentList.filter((child, index) => Number(child.getAttribute("data-index")) !== (index + 1) );
      console.log(unMatchedList);

    if( unMatchedList.length === 0 ) {
      setTimeout(() => {
        alert("성공!");
      }, 500)
    }

  }
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
      <div className="puzzle__board" ref={containerRef}>
        {isStart ? isCount ? <Shuffletiles /> : <Puzzletiles /> : <Waitng />}
        {/* <Shuffletiles /> */}
      </div>
      <button className="puzzle__btn" onClick={setGame}>
        <span>Start</span>
      </button>
    </div>
  );
}

export default Puzzle;
