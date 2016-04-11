import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import App from '../../script/components/app';

describe('App', () => {
  it('should exist', () => {
    const renderer = TestUtils.createRenderer();
    const output = renderer.render(<App />);

    expect(output.type).toEqual('div');
  });
});
