import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Hi from './hi.jsx';

describe('<Hi />', () => {

  const defaultProps = { name: "Jonny" }

  it('must render', () => {
    const wrapper = shallow(<Hi {...defaultProps} />)
    // const wrapper = mount(<Foo />);
    expect(wrapper.props().name).to.be.defined;
  });

});

describe('the environment', () => {
  it('works, hopefully', () => {
    expect(true).to.be.true;
  });
});