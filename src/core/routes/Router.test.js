import {Router} from './Router';
import {Page} from '../Page';

class Dashboard extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'Dashboard';

    return root;
  }
}

class Excel extends Page {
}


describe('Router:', () => {
  let router;
  let $root;

  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      dashboard: Dashboard,
      excel: Excel,
    });
  });

  test('should be return router', () => {
    expect(router).toBeDefined();
  });

  test('should render Dashboard Page', () => {
    router.changePageHandler();
    expect($root.innerHTML).toBe('<div>Dashboard</div>');
  });

  test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });
});
