/* ---------------------------------------------------------
   1. 요소 선택  
   --------------------------------------------------------- */
const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const list = document.querySelector('.todo-list');
const emptyMsg = document.querySelector('.empty-msg');
const countText = document.querySelector('.todo-count');
const clearBtn = document.querySelector('.clear-btn');


/* ---------------------------------------------------------
   2. 데이터: 할 일 목록을 '배열'에 저장한다.
      배열 안의 각 항목은 { text: 글자, done: 완료 여부 } 객체이다.
      핵심: 화면(HTML)이 아니라 이 배열이 '진짜 데이터'이다.
   --------------------------------------------------------- */
let todos = [
   { text: 'HTML 복습하기', done: true },
   { text: '자바스크립트 배열 공부하기', done: false },
   { text: 'To-do List 직접 만들어 보기', done: false }
];


/* ---------------------------------------------------------
   3. 화면 그리기 함수 render()
      배열(todos)의 내용을 보고 목록 화면을 처음부터 다시 만든다.
      데이터가 바뀔 때마다 이 함수를 호출하면 화면이 항상 데이터와 같아진다.
   --------------------------------------------------------- */
function render() {
  // (1) 기존 목록을 모두 비운다. (비우지 않으면 항목이 중복해서 쌓인다.)
  list.innerHTML = '';


  // (2) 배열의 항목을 하나씩 꺼내 li 요소를 만든다.
  //     todo = 배열의 각 항목(객체), index = 그 항목의 순번(0, 1, 2 ...)
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (todo.done) {
      li.classList.add('done'); //완료된 항목은 취소선으로 스타일 적용
    }

    //체크박스 만들기
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = todo.done; //체크박스 상태를 done 값에 맞게 설정
    check.addEventListener('change', () => {
      todos[index].done = check.checked; //체크박스 상태가 바뀌면 done 값을 바꿈
      render(); //화면을 다시 그려줌
      });

    //글자 만들기
    const span = document.createElement('span');
    span.classList.add('todo-text');
    span.textContent = todo.text;

    //삭제 버튼 만들기
    const delBtn = document.createElement('button');
    delBtn.classList.add('del-btn');
    delBtn.type = 'button';
    delBtn.textContent = '삭제';
    delBtn.addEventListener('click', () => {
      todos.splice(index, 1); //배열에서 index위치에 1개 삭제
      render(); //화면을 다시 그려줌
    });

    //li 안에 자식 요소를 차례대로 넣음
    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(delBtn);

    //완성된 li를 ul 안에 넣는다.
    list.appendChild(li);
  });


  // (3) 목록 아래의 '남은 할 일' 개수와 안내 문구를 갱신한다.
  const remaining = todos.filter(todo => todo.done === false).length;
  countText.textContent = '남은 할 일 ' + remaining + '개';
  if (todos.length === 0) {
   emptyMsg.classList.add('show'); //할 일이 하나도 없으면 안내 문구를 보여줌
   }

   else {
   emptyMsg.classList.remove('show'); //할 일이 있으면 안내 문구를 숨김
   }
}


/* ---------------------------------------------------------
   4. 할 일 추가 — form 의 submit 이벤트
      Enter 키를 누르거나 '추가' 버튼을 누르면 submit 이 발생한다.
      submit 의 기본 동작은 '페이지 새로고침'이므로
      preventDefault() 로 막아야 우리가 만든 코드가 실행된다.
   --------------------------------------------------------- */
form.addEventListener('submit', (event) => {
   event.preventDefault(); //페이지 새로고침 방지

   //앞 뒤 공백 제거한 글자를 가져온다.
   const text = input.value.trim();

   //빈칸이면 추가하지 않고 입력창으로 돌아가기
   if (text === '') {
      input.focus(); //입력창에 포커스
      return; //함수 종료
   }

   //배열 맨 뒤에 새 항목으로 추가하기
   todos.push({ text: text, done: false });

   input.value = ''; //입력창 비우기
   input.focus(); //입력창에 포커스
   render(); //화면을 다시 그려줌
});


/* ---------------------------------------------------------
   5. 완료 항목 삭제
      filter(): 조건을 만족하는 항목만 모아 '새 배열'을 만든다.
      done 이 false 인(= 아직 안 끝난) 항목만 남기면 완료 항목이 사라진다.
   --------------------------------------------------------- */
clearBtn.addEventListener('click', () => {
   todos = todos.filter(todo => todo.done === false); //완료 항목 삭제
   render(); //화면을 다시 그려줌
});


/* ---------------------------------------------------------
   6. 페이지를 열자마자 처음 한 번 그린다.
   --------------------------------------------------------- */
render();
