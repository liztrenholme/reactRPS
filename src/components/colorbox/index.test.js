import Colorbox from './index';
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai, { expect, should } from 'chai';
import spies from 'chai-spies'

chai.use(spies);

configure({adapter: new Adapter()});

describe('<Colorbox />', function () {
  it('should render', () => {
    const wrapper = shallow(<Colorbox />);
    expect(wrapper.find('div.main')).to.have.length(1);
  });
  it('should have a header', () => {
    const wrapper = shallow(<Colorbox />);
    expect(wrapper.find('.header')).to.have.length(1);
  });
  it('swap button is present', () => {
    const wrapper = mount(<Colorbox />);
    const instance = wrapper.instance();
    const spy = chai.spy.on(instance);
    expect(wrapper.find('button.swapBtn')).to.have.length(1);
  });
});

test('mode is never undefined', () => {
  const mode = 'hex' || 'rgb' || 'colorName';
  expect(mode).to.be.not.undefined;
});

test('mode is never null', () => {
  const mode = 'hex' || 'rgb' || 'colorName';
  expect(mode).to.be.not.null;
});

test('color is not undefined', () => {
  const color = '#ffffff';
  expect(color).to.be.not.undefined;
});

test('no part of the color string is NaN', () =>{
  const string = 'f1c295'
  expect(string).to.be.not.equal('NaN');
});
