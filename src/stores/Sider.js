import { observable, action } from 'mobx';

/**
 * StoreSider
 */
class StoreSider {
  @observable collapsed = false;

  @action
  onCollapse = (collapsed) => {
    this.collapsed = !collapsed;
  };

  @action
  onBreakpoint = (broken) => {
    this.collapsed = broken;
  };
}

const storeSider = new StoreSider();

export default storeSider;
