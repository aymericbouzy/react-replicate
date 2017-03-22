import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Simple from './simple';

// Demo tests

// Shallow Rendering
// https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
describe('Shallow Rendering', () => {
  it('should have 6 blocks', () => {
    const wrapper = shallow(<Simple />);
    expect(wrapper.find('.block')).to.have.length(6);
  });
});
