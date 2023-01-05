import Component from './core/Component.js';
import ItemAppender from './components/ItemAppender.js';
import Items from './components/Items.js';
import ItemFilter from './components/ItemFilter.js';

export default class App extends Component {
  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        {
          idx: 1,
          content: 'item1',
          active: false
        },
        {
          idx: 2,
          content: 'item2',
          active: true
        }
      ]
    };
  }

  template() {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');

    new ItemAppender($itemAppender, {addItem: addItem.bind(this)});
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {filterItem: filterItem.bind(this)});
  }

  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(({active}) => (isFilter === 1 && active) || (isFilter === 2 && !active) || isFilter === 0);
  }

  addItem(content) {
    const { items } = this.$state;
    const idx = Math.max(0, ...items.map(v => v.idx)) + 1;
    const active = false;
    this.setState({
      items: [...items, {idx, content, active}]
    });
  }

  deleteItem(idx) {
    const items = [...this.$state.items];
    items.splice(items.findIndex(v => v.idx === idx), 1);
    this.setState({ items });
  }

  toggleItem(idx) {
    const items = [...this.$state.items];
    const index = items.findIndex(v => v.idx === idx);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
