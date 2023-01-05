import Component from '../core/Component.js';

export default class ItemAppender extends Component {
  template() {
    return `<input class="append" type="text" placeholder="아이템 내용 입력" />`;
  }

  setEvent() {
    const { addItem } = this.$props;
    this.addEvent('keyup', '.append', ({ key, target }) => {
      if (key !== 'Enter') return;
      addItem(target.value);
    })
  }
}
