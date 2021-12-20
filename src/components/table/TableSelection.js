export class TableSelection {
  static ActiveClass = '--selected';

  constructor() {
    this.selected = [];
    this.current = null;
  }

  select($element) {
    this.clear();
    $element.focus().addClass(TableSelection.ActiveClass);
    this.selected.push($element);
    this.current = $element;
  }

  clear() {
    this.selected.forEach($el => $el.removeClass(TableSelection.ActiveClass));
    this.selected = [];
  }

  selectGroup($group) {
    this.clear();
    this.selected = $group;
    $group.forEach($cell => $cell.addClass(TableSelection.ActiveClass));
  }
}
