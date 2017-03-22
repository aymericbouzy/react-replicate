import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Simple, {Block} from './simple';
import {EmitterReceiver} from '../index'

const {Emitter, Receiver} = new EmitterReceiver()


describe('Simple', () => {
  it('should have 6 blocks', () => {
    const wrapper = mount(<Simple />);
    expect(wrapper.find(Block)).to.have.length(6);
    wrapper.unmount();
  });
});


describe('Emitter and Receiver', () => {
  it('should update children', () => {
    const Block = () => <div className={'block'}></div>
    const receiver = mount(<Receiver />)
    function expectToFindBlocks(receiver, count) {
      expect(receiver.find(Block)).to.have.length(count)
    }
    expectToFindBlocks(receiver, 0)
    const emitter = mount(<Emitter />)
    expectToFindBlocks(receiver, 0)
    emitter.setProps({children: [<Block key={1}/>]})
    expectToFindBlocks(receiver, 1)
    const receiver2 = mount(<Receiver />)
    expectToFindBlocks(receiver2, 1)
    const emitter2 = mount(<Emitter><Block /></Emitter>)
    expectToFindBlocks(receiver, 2)
    expectToFindBlocks(receiver2, 2)
    emitter2.unmount()
    expectToFindBlocks(receiver, 1)

    /*
    */
  })
})
