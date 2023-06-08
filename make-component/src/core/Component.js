export default class Component {
  constructor(target) {
    console.log(target);
    this.$target = target;
    this.state;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  template() {
    return "";
  }
  setEvent() {}
  render() {
    this.$target.innerHTML = this.template();
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
