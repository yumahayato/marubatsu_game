'use strict';

{
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const r = 40;
  let won = false;
  let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const win_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


  function field () {
    for(let i=1; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 80, 10);
      ctx.lineTo(i * 80, canvas.width - 10);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#007070";
      ctx.stroke();
    }
    for(let i=1; i <= 2; i++) {
      ctx.beginPath();
      ctx.moveTo(10, i * 80);
      ctx.lineTo(canvas.height - 10, i * 80);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#007070";
      ctx.stroke();
    }
  }

  function circle(x, y) {
    ctx.beginPath();
    ctx.arc(x + r, y + r , r - 20, 0, Math.PI*2);
    ctx.strokeStyle = "#004040"
    ctx.lineWidth = 10;
    ctx.stroke();
  }
  function cross(y, x) {
    const S_L = r * 2 - 40;
    const crossY = y + 20;
    const crossX = x + 20;
    ctx. beginPath();
    ctx.moveTo(crossY, crossX);
    ctx.lineTo(crossY + S_L,crossX + S_L);
    ctx.moveTo(crossY + S_L, crossX);
    ctx.lineTo(crossY,crossX + S_L);
    ctx.strokeStyle = "#004040";
    ctx.lineWidth = 10;
    ctx.stroke();
  }
  field(); //フィールド描画

  function winner() {
    let grid_spread = [...grid[0], ...grid[1], ...grid[2]];
    let referee = 0;
    win_patterns.forEach((pattern) => {
      if(
        grid_spread[pattern[0]] === 1 &&
        grid_spread[pattern[1]] === 1 &&
        grid_spread[pattern[2]] === 1
      ) {
        referee = "cross";
      } else if(
        grid_spread[pattern[0]] === 2 &&
        grid_spread[pattern[1]] === 2 &&
        grid_spread[pattern[2]] === 2
      ) {
        referee = "circle";
      }
    });
    return referee;
  }
  const turn = document.getElementById('turn');

  function win(winner) {
    if(won === false) {
      if (winner === "cross") {
        turn.textContent = "ばつの勝ち";
        won = true;
      } else if (winner === "circle") {
        turn.textContent = "まるの勝ち";
        won = true;
      } else {
        turn.textContent = `${flg ? "まる" : "ばつ"}の番です`;
      }
    }
  }
  
  let flg = false;
  turn.textContent = `${flg ? "まる" : "ばつ"}の番です`;
  let click_count = 0;
  
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const col = Math.floor((e.clientY - rect.top) / 80);
    const row = Math.floor((e.clientX - rect.left) / 80);
    if (won === false) {
      if(grid[row][col] === 0) {
        if(flg === false){
          cross(row * 80, col * 80); // ばつ
          grid[row][col] = 1;
        } else {
          circle(row * 80, col * 80);// まる
          grid[row][col] = 2;
        }
        flg = !flg;
    }
    win(winner());
  }
  });
  document.getElementById('reset').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    let flg = false;
    won = false;
    grid =[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    ];
    field();
    // turn.textContent = `${flg ? "まる" : "ばつ"}の番です`;
    win(winner());
  });

}