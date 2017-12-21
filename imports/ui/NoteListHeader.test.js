import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NoteListHeader } from './NoteListHeader';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient){
  describe('NoteListHeader', function () {
    it('should call meteorcall on click', function () {
      const spy = sinon.spy();
      const wrapper = mount(<NoteListHeader meteorCall={spy}/>);

      wrapper.find('button').simulate('click');

      expect(spy.calledWith('notes.insert')).to.equal(true);
    });
  });
}
