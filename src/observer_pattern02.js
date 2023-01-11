class 발행기관 {
  #state;
  #observers = new Set();

  constructor(state) {
    this.#state = state;
    Object.keys(state).forEach(key => Object.defineProperty(this, key, {
      get: () => this.#state[key]
    }));
  }

  내부에_변화가_생김(newState) {
    this.#state = {...this.#state, ...newState};
    this.구독자에게_알림();
  }

  구독자_등록(subscriber) {
    this.#observers.add(subscriber);
  }

  구독자에게_알림() {
    this.#observers.forEach(fn => fn());
  }
}

class 구독자 {
  /*
  * 구독자는 발행기관에서 변화가 생겼을 때 하는 일을 정의
  * 발행 기관을 구독
  */
  #fn;

  constructor(발행기관에_변화가_생길_때_하는_일) {
    this.#fn = 발행기관에_변화가_생길_때_하는_일;
  }

  구독(publisher) {
    publisher.구독자_등록(this.#fn);
  }
}

//적용
const 상태 = new 발행기관({
  a: 10,
  b: 20
});

const 덧셈계산기 = new 구독자(() => console.log(`a + b = ${상태.a + 상태.b}`));
const 곱셈계산기 = new 구독자(() => console.log(`a * b = ${상태.a * 상태.b}`));

덧셈계산기.구독(상태);
곱셈계산기.구독(상태);

상태.구독자에게_알림();

상태.내부에_변화가_생김({a: 100, b:200});

/*
해당 코드는 문제가 있음
현재 작성한 코드는 2명의 구독자가 1개의 잡지를 구독하고 있는 상황.
만약 10명의 구독자가 100개의 잡지를 구독할 경우, 구독 관련 코드가 기하급수적으로 늘어남
*/
