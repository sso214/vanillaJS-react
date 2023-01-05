import Component from '../core/Component.js';

export default class Items extends Component {
  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(({active}) => (isFilter === 1 && active) || (isFilter === 2 && !active) || isFilter === 0);
  }
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
    const { isFilter, items } = this.$state;

    return `
      <header>
         <input class="append" type="text" placeholder="아이템 내용 입력" />
      </header>
      
      <main>
        <ul>
          ${this.filteredItems.map(({ idx, content, active }) => `
            <li data-idx="${idx}">
              ${content}
              <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
                ${active ? '활성' : '비활성'}
              </button>
              <button class="deleteBtn">삭제</button>
            </li>
          `).join('')}
        </ul>
      </main>
      
      <footer>
        <button class="filterBtn" data-filter="0">전체 보기</button>
        <button class="filterBtn" data-filter="1">활성 보기</button>
        <button class="filterBtn" data-filter="2">비활성 보기</button>
      </footer>
    `;
  }
  setEvent() {
    this.addEvent('keyup', '.append', ({ key, target }) => {
      if (key !== 'Enter') return;
      const { items } = this.$state;
      const idx = Math.max(0, ...items.map(v => v.idx)) + 1;
      const content = target.value;
      const active = false;
      this.setState({
        items: [
          ...items,
          {idx, content, active}
        ]
      });
    });

    this.addEvent('click', '.deleteBtn', ({ target }) => {
      const items = [...this.$state.items];
      const idx = Number(target.closest('[data-idx]').dataset.idx);
      items.splice(items.findIndex(v => v.idx === idx), 1);
      this.setState({ items });
    });

    this.addEvent('click', '.toggleBtn', ({ target }) => {
      const items = [...this.$state.items];
      const idx = Number(target.closest('[data-idx]').dataset.idx);
      const index = items.findIndex(v => v.idx === idx);
      items[index].active = !items[index].active;
      this.setState({ items });
    });

    this.addEvent('click', '.filterBtn', ({ target }) => {
      this.setState({ isFilter: Number(target.dataset.filter) });
    });
  }
}
