/*
Store(중앙 집중식 저장소)와 Component의 관계
* Store는 여러 개의 컴포넌트에서 사용 가능함
* Store가 변경될 때, Store가 사용하고 있는 Component도 변경되어야 함
*/

//Store 생성
const store = new Store({
  a: 10,
  b: 20,
});

//컴포넌트 생성
const component1 = new Component({subscribe: [store]});
const component2 = new Component({subscribe: [store]});

//컴포넌트가 store를 구독
component1.subscribe(store);
component2.subscribe(store);

//store의 state를 변경
store.setState({
  a: 100,
  b: 200
});

//store가 변경되었음을 알림
store.notify();

/*
Observer Pattern :
객체의 상태 변화를 관찰하는 관찰자들(옵저버들)의 목록을 객체에 등록해
상태 변화가 있을 때마다 메서드 등을 통해 객체가 직접
목록의 각 옵저버에게 통지하도록 하는 디자인 패턴

주로 분산 이벤트 핸들링 시스템을 구현하는데 사용하며,
발행/구독 모델로 알려져 있기도 함
*/
