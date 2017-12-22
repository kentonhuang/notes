import { Meteor } from 'meteor/meteor';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon'
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { notes } from '../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe('NoteListItem', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: sinon.spy()
      };
    });

    it('should render title and timestamp', function () {
      const wrapper = mount( <NoteListItem note ={notes[0]} Session={Session}/> );

      expect(wrapper.find('h5').text()).to.equal(notes[0].title);
      expect(wrapper.find('p').text()).to.equal('12/19/17');
    });

    it('should set default title if no title set', function () {
      const wrapper = mount( <NoteListItem note ={notes[1]} Session={Session}/> );

      expect(wrapper.find('h5').text()).to.equal('Untitled note');
      expect(wrapper.find('p').text()).to.equal('12/19/17');
    })

    it('should call set on click', function() {
      // Rendern NoteListItem
      const wrapper = mount( <NoteListItem note ={notes[0]} Session={Session}/> );
      wrapper.find('div').simulate('click');
      expect(Session.set.calledWith('selectedNoteId', notes[0]._id)).to.equal(true);
    })
  });

}
