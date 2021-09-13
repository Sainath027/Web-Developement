// const arr = [[0, 7, 8, 0, 4, 5, 0, 0, 0],
// [9, 0, 0, 0, 0, 6, 8, 0, 0],
// [6, 5, 2, 0, 0, 0, 0, 0, 0],
// [0, 2, 4, 0, 0, 3, 0, 0, 0],
// [0, 1, 0, 6, 8, 0, 3, 0, 0],
// [0, 0, 0, 0, 5, 0, 0, 0, 0],
// [0, 9, 0, 0, 0, 2, 7, 3, 0],
// [0, 0, 1, 0, 0, 0, 0, 0, 5],
// [0, 6, 0, 0, 0, 0, 2, 1, 9]];
const arr = [
  [1, 2, 3, 0, 0, 0, 0, 8, 9],
  [0, 0, 0, 0, 0, 0, 4, 5, 6],
  [0, 0, 0, 7, 8, 9, 0, 0, 0],
  [2, 3, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 5, 6, 7],
  [0, 0, 0, 8, 9, 1, 0, 0, 0],
  [3, 4, 5, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 7, 8],
  [0, 0, 0, 9, 1, 2, 0, 0, 0]
];
const ans = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [9, 1, 2, 3, 4, 5, 6, 7, 8],
  [6, 7, 8, 9, 1, 2, 3, 4, 5]
];
var check=0;
// const arr=[
//   [9,8,7,0,0,0,0,0,0],
//   [0,0,0,9,8,7,0,0,0],
//   [0,0,0,0,0,0,9,8,7],
//   [8,7,6,0,0,0,0,0,0],
//   [0,0,0,8,7,6,0,0,0],
//   [0,0,0,0,0,0,8,7,6],
//   [7,6,5,0,0,0,0,0,0],
//   [0,0,0,7,6,5,0,0,0],
//   [0,0,0,0,0,0,7,6,5]
// ];
const generate = document.querySelector('#generate');
const solve = document.querySelector("#solve");
const visualize = document.querySelector("#visualize");
const usertime = document.querySelector("#timer0");
const computertime = document.querySelector("#timer1");
let seconds = 0;
//initilising the remaining numbers
const remaining = [];
for (let i = 0; i < 9; i++) {
  let str = "#remain-";
  str = str + (i + 1);
  remaining[i] = document.querySelector(str);
  remaining[i].textContent = 9;
  remaining[i].setAttribute("disabled", true);
}
//keeping ids of sudoko in array named sudoko
const sudoko = [];
for (let i = 0; i < 9; i++)
  sudoko[i] = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    const str = "#block-" + i + j;
    sudoko[i][j] = document.querySelector(str);
    sudoko[i][j].addEventListener("input", remainingUpdate);
  }
}
//Generate Function
generate.addEventListener('click', function () {
  usertime.textContent = "00:00";
  computertime.textContent = "00:00";
  for (let i = 0; i < 9; i++) {
    remaining[i].textContent = 9;
    remaining[i].setAttribute("disabled", true);
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] == 0) {
        sudoko[i][j].removeAttribute('disabled');
        sudoko[i][j].value = "";
      }
      else {
        sudoko[i][j].value = arr[i][j];
        remaining[arr[i][j] - 1].textContent = remaining[arr[i][j] - 1].textContent - 1;
        sudoko[i][j].setAttribute('disabled', true);
      }
    }
  }
  generate.setAttribute("disabled", true);
  document.body.style.background = "rgb(235, 235, 240)";
});

async function sleep(ts) {
  return new Promise((resolve, reject) => {
    return setTimeout(resolve, ts)
  })
}
//solve functionality
async function solveSudoko(board) {

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j].value !== "") continue;
      for (var k = 1; k <= 9; k++) {

        await sleep(1)
        if (isValid(board, i, j, k)) {
          board[i][j].value = k;
          remaining[k - 1].textContent = remaining[k - 1].textContent - 1;
          if (await solveSudoko(board)) {
            console.log(board);
            return true;
          } else {

            board[i][j].value = '';
            remaining[k - 1].textContent = remaining[k - 1].textContent - 1 + 2;
          }
        }
      }
      return false;
    }
  }
  return true;
};
//
function isValid(board, i, j, num) {
  for (var k = 0; k < 9; k++) {
    if (board[i][k].value == num) return false;
    if (board[k][j].value == num) return false;
    if (board[Math.floor(i / 3) * 3 + Math.floor(k / 3)][Math.floor(j / 3) * 3 + (k % 3)].value == num) return false;
  }
  return true;
};
//computer time
function computer() {
  computertime.textContent = seconds / 60 + ":" + seconds % 60;
  seconds++;
};
let running_visualize = 0;
//
visualize.addEventListener('click', async function () {
  //setInterval()
  var seconds = 0;
  var interval = setInterval(function () {
    computertime.textContent = Math.floor(seconds / 60) + ":" + seconds % 60;
    seconds++;
  }, 1000);
  var abc = await solveSudoko(sudoko);
  console.log(abc);
  if (abc)
    document.body.style.background = "green";
  else {
    document.body.style.background = "red";
  }
  clearInterval(interval);
  generate.removeAttribute("disabled");
});
let running_solve = 0;
let prev=0;
solve.addEventListener('click', function () {
  if(check===1){
    console.log(123456789);
    check=0;
    let flag=1;
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(sudoko[i][j].value==ans[i][j])
          continue;
        flag=0;
      }
      if(flag===0){
        break;
      }
    }
  if (flag===0)
    document.body.style.background = "red";
  else 
    document.body.style.background = "green";
  }
  else if (running_solve == 0) {
    solve.innerHTML = '&nbsp;&nbsp;' + "stop" + '&nbsp;&nbsp;';
    running_solve = 1;
    var seconds = prev;
    var interval = setInterval(function () {
      let min=Math.floor(seconds / 60);
      let sec=seconds % 60;
      if(min<10)
        min='0'+min;
      if(sec<=9)
        sec='0'+sec;
      usertime.textContent = min + ":" + sec;
      seconds++;
      if (running_solve == 0) {
        solve.innerHTML = '&nbsp;'+"solve"+'&nbsp;';
        prev=seconds;
        clearInterval(interval);
      }
    }, 1000);
  } else {
    running_solve = 0;
    seconds = 0;
  }
});
function remainingUpdate() {
  console.log("haiiiiiii");
  let a = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let temp = sudoko[i][j].value;
      if (temp === "")
        continue;
      a[temp - 1]++;
    }
  }
  for(let i=0;i<9;i++){
    remaining[i].textContent=9-a[i];
  }
  console.log(a);
  let count=0;
  for(let i=0;i<9;i++){
    if(a[i]===9)
      count++;
  }
  if(count===9)
  {
    solve.innerHTML = '&nbsp;' + "check" + '&nbsp;';
    check=1;
  }
}
function checkInput(a) {

}
