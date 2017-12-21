import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PrivateHeader } from './PrivateHeader';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('PrivateHeader', function() {

    it('should set button text to logout', function () {
      const wrapper = mount(<PrivateHeader title="Test title" handleLogout={() => {}}/>)

      const buttonText = wrapper.find('button').text();

      expect(buttonText).to.equal('Logout');
    });

    it('should use title prop as h1 text', function () {
      const title = 'This is the Test Title';
      const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}}/>)
      const titleText = wrapper.find('h1').text();

      expect(titleText).to.equal(title);
    });

    it('should call the function', function () {
      const spy = sinon.spy();

      spy(3,4,2);

      expect(spy.called).to.equal(true);
    });

    it('should call handleLogout on click', function () {
      const spy = sinon.spy();
      const wrapper = mount(<PrivateHeader title="title" handleLogout={spy}/>)
      wrapper.find('button').simulate('click');

      expect(spy.called).to.equal(true);
    });

  });
}
