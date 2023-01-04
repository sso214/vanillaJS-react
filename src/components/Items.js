import Component from '../core/Component.js';

export default class Items extends Component {
  setup() {
    this.$state = { items: ['item1', 'item2', 'item3'] };
  }
  template() {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map((item, key) => `
          <li>
            ${item}
            <button class="deleteBtn" data-key="${key}">Delete</button>
          </li>
        `).join('')}
      </ul>
      <button class="addBtn">Add Item</button>
    `;
  }
  setEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      const items = [...this.$state.items];

      if (target.classList.contains('addBtn')) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      if (target.classList.contains('deleteBtn')) {
        items.splice(target.dataset.key, 1);
        this.setState({ items });
      }
    });
  }
}
