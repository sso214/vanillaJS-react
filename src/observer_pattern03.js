/*
앞서 작성한 코드를 단순하게 observable과 observer라는 관계로 만들어보자
* observable은 observe에서 사용된다.
* observable에 변화가 생기면, observe에 등록된 함수가 실행된다.
*/
const 상태 = observable({a : 10, b: 20});
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a * b = ${상태.a} * ${상태.b}`));
observe(() => console.log(`a - b = ${상태.a} - ${상태.b}`));

상태.a = 100;
상태.b = 200;


/*
Object.defineProperty(object, prop, descriptor)

* Object : 속성을 정의한 객체
* prop : 새로 정의하거나 수정하려는 속성의 이름 또는 Symbol
* descriptor : 새로 정의하거나 수정하려는 속성을 기술하는 객체

객체에 직접 새로운 속성을 정의하거나 이미 존재하는 속성을 수정한 후, 그 객체를 반환함
=> 객체에 어떤 변화가 생기거나 객체를 참조할 경우 원하는 행위를 중간에 집어넣을 수도 있음
*/
const state = { a: 10, b: 20 };
const stateKeys = Object.keys(state);
const observer_pattern03 = () => console.log(`a + b = ${state.a + state.b}`);

for(const key of stateKeys) {
  let _value = state[key];
  Object.defineProperty(state, key, {
    get() {
      return _value;
    },
    set(value) {
      _value = value;
      observer_pattern03();
    }
  });
}

observer_pattern03();

state.a = 100;
state.b = 200;



/*
여러 개의 observer를 만들어 관리
핵심은 함수가 실행될 때 currentObserver가 실행중인 함수를 참조하도록 만드는 것
* state의 property가 사용될 때 (=get 메서드가 실행될 때) currentObserver를 observers에 등록한다.
* state의 property가 변경될 때 (=set 메서드가 실행될 떄) observers에 등록된 모든 observer를 실행한다.
*/
let currentObserver = null;

const state = { a: 10, b : 20 };
const stateKeys = Object.keys(state);

for (const key of stateKeys) {
  let _value = state[key];
  const observers = new Set();
  Object.defineProperty(state, key, {
    get() {
      if (currentObserver) observers.add(currentObserver);
      return _value;
    },
    set(value) {
      _value = value;
      observers.forEach(observer => observer());
    }
  });
}

const 덧셈_계산기 = () => {
  currentObserver = 덧셈_계산기;
  console.log(`a + b == ${state.a + state.b}`);
}

const 뺄셈_계산기 = () => {
  currentObserver = 뺄셈_계산기;
  console.log(`a - b = ${state.a - state.b}`);
}

덧셈_계산기();
뺄셈_계산기();
state.a = 100;
state.b = 200;


/*
함수화
코드 재사용을 위해 observer, observable 함수로 변경
*/
let currentObserver = null;

const observe = fu => {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

const observable = obj => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        _value = value;
        observers.forEach(fn => fn());
      }
    });
  });
  return obj;
}

const 상태 = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a * b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a - b = ${상태.a} + ${상태.b}`));

상태.a = 100;
상태.b = 200;
