import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NoteListItem from './NoteListItem';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe('NoteListItem', function () {
    it('should render title and timestamp', function () {
      const title = 'My title here';
      const updatedAt = 1513729876128;
      const wrapper = mount( <NoteListItem note ={{title, updatedAt}}/> );

      expect(wrapper.find('h5').text()).to.equal(title);
      expect(wrapper.find('p').text()).to.equal('12/20/17');
    });

    it('should set default title if no title set', function () {
      const updatedAt = 1513729876128;
      const wrapper = mount( <NoteListItem note ={{updatedAt}}/> );

      expect(wrapper.find('h5').text()).to.equal('Untitled note');
      expect(wrapper.find('p').text()).to.equal('12/20/17');
    })
  });

}
