export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  template() { return ''; }
  setEvent() {}

  render() {
    this.$target.innerHTML = this.template();
  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
