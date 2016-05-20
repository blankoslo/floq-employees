/* eslint-disable no-unused-expressions */

import { renderComponent, expect } from '../testhelper';
import App from '../../src/containers/app';

describe('App', () => {
  it('exists', () => {
    const component = renderComponent(App, { params: {} });

    expect(component).to.exist;
  });
});
