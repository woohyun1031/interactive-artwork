import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    this.state = { items: ["item1", "item2"] };
  }
  template() {
    const { items } = this.state;
    return `
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>
      <button class='addBtn'>추가</button>
    `;
  }
  setEvent() {
    this.$target.addEventListener("click", ({ target }) => {
      console.log(target);
      const { items } = this.state;
      if (target.classList.contains("addBtn")) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }
    });
  }
}
