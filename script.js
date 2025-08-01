const func = document.querySelectorAll('.function');
const num = document.querySelectorAll('.number');
const oper = document.querySelectorAll('.operator');
// 위의 세가지는 클래스 이름을 가진 속성이 여러개 이므로 querySelectorAll을 사용
const dot = document.querySelector('.dot');
const equal = document.querySelector('.equal');
const display = document.querySelector('.result');
const buttons = document.querySelectorAll('.button');
// 나머지는 하나만 존재하므로 querySelector사용
const container = document.querySelector('.container');
const hidden = document.querySelector('.yellow-btn');
const quit = document.querySelector('.red-btn');
const editor = document.querySelector('.bottom-editor');
const calContainer = document.querySelector('.cal-img');
const catContainer = document.querySelector('.cat-img');
const controllCont = document.querySelector('.controll-container');
const displayCont = document.querySelector('.display');
const catCont = document.querySelector('.cat-cont');
const change = document.querySelector('.change');
const catArray = ['img/noori.png' , 'img/bori.JPG','img/noori1.JPG', 'img/noori2.jpg','img/mycat.JPG'];
let firstOperand = 0;
let secondOperand = 0;
let operator = '';
let hasOper = false;
// operator | equal 을 눌렀을때의 상태

const calculate = function(firstOperand, operator, secondOperand){
  if (operator === '+'){
    display.textContent = Number(firstOperand) + Number(secondOperand);
  }else if(operator === '-'){
    display.textContent = Number(firstOperand) - Number(secondOperand);
  }else if (operator ==='x'){
    display.textContent = Number(firstOperand) * Number(secondOperand);
  }else if (operator === '÷'){
     if(((Number(firstOperand) / Number(secondOperand))+'').length > 3){
      display.textContent = (Number(firstOperand) / Number(secondOperand)).toFixed(2);
     }else{
      display.textContent = Number(firstOperand) / Number(secondOperand);
     }
    // 소수점 두번째 자리에서 반올림
  }
}
// calculate 함수

// 숫자가 길어지면 숫자폰트가 작아지는 함수
function numberLength(){
  if (display.textContent.length >= 21){
    display.style.fontSize = "30px";
  }else if (display.textContent.length >= 13){
    display.style.fontSize = "40px";
  }else{
    display.style.fontSize = "60px"
  }
}

equal.addEventListener('click',() => {
  if (operator && !hasOper){
    // operator가 존재하고 secondOerand를 누르고 =을 누를때
    secondOperand = display.textContent;
    calculate(firstOperand, operator, secondOperand);
    firstOperand = secondOperand;
    secondOperand = 0;
    hasOper = true;
  }
  //  operator가 눌려있는 상태에서 숫자를 누르지 않고, 바로 =을 누르는 경우에는 아무것도 처리 안함
  numberLength();
});


dot.addEventListener('click',() => {
  if (!display.textContent.includes('.')){
    display.textContent += '.';
  }
  // 소수점이 포함되어있지 않을때만 소수점을 추가
  numberLength();
});
 
for (let value of oper){
  value.addEventListener('click', ()=>{
    if (operator && !hasOper) {
      // 숫자입력이 끝났을때 (연산자를 눌렀을때 계산이 되도록)
      secondOperand = display.textContent;
      calculate(firstOperand, operator, secondOperand);
      firstOperand = display.textContent; // 결과를 다음 계산에 활용
    } else {
      // 연산자가 없을때 (즉, 초기에 숫자만 입력한 상황)
      firstOperand = display.textContent;
    }
    operator = value.textContent; 
    hasOper = true;  
  });
};
for (let value of num){
  value.addEventListener('click', ()=>{
    if (display.textContent === '0'){
      display.textContent = value.textContent;
    }else{
      if (hasOper){
        display.textContent = value.textContent;
        hasOper = false;
      }else{
        display.textContent += value.textContent;
      }
    }
    numberLength();
  })
};

for (let value of func){
  value.addEventListener('click', ()=>{
    if (value.textContent === 'C'){
      display.textContent = 0;
      firstOperand = 0;
      secondOperand = 0;
      operator = '';
      hasOper = false;
      // C누를때 firstOperand, secondOperand, operator, hasOper 초기화
    }else if(value.textContent === '+/-'){
      display.textContent = - display.textContent;
      // +/- 를 누르면 부호 바뀌게 구현
    }
  })
};

// 노란버튼 누르면 계산기 숨겨지게
hidden.addEventListener(('click'), () =>{
  container.style.opacity = 0;
  editor.style.opacity = 1;
})
// editor누르면 계산기 나오게
editor.addEventListener(('click'), ()=>{
  container.style.opacity = 1;
  container.style.backgroundImage = 'none';
  editor.style.opacity = 0;
  buttons.forEach((val) =>{
    val.style.opacity = 1;
  });
  displayCont.style.opacity = 1;
  display.style.opacity = 1;
  container.style.backgroundColor = "rgb(88, 88, 88)";
})
// x누르면 계산기 종료
quit.addEventListener(('click'), () =>{
  container.style.opacity = 0;
  display.textContent = 0;
})
// 하단 아이콘 누르면 계산기 나오게
calContainer.addEventListener(('click'),() =>{
  container.style.opacity = 1;
  container.style.backgroundImage = 'none';
  editor.style.opacity = 0;
  buttons.forEach((val) =>{
    val.style.opacity = 1;
  });
  displayCont.style.opacity = 1;
  display.style.opacity = 1;
  container.style.backgroundColor = "rgb(88, 88, 88)";
})
// Mycat누르면 고양이 사진 나오게
catContainer.addEventListener(('click'), ()=>{
  catCont.style.opacity = 1;
  let randomImageUrl = catArray[Math.floor(Math.random() * catArray.length)];
  catCont.style.backgroundImage = `url(${randomImageUrl})`;
})

// 새로고침 누르면 고양이 사진 바뀌게
change.addEventListener(('click'),() =>{
  let randomImageUrl = catArray[Math.floor(Math.random() * catArray.length)];
  catCont.style.backgroundImage = `url(${randomImageUrl})`;
})

