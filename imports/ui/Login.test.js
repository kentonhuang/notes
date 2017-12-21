import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import sinon from 'sinon'
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Login } from './Login';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Login', function () {

    it('should show error messages', function () {
        const error = 'This is not working'
        const wrapper = shallow(
            <Login loginWithPassword={() => {}}/>
        );
        wrapper.setState({error});
        expect(wrapper.find('p').text()).to.equal(error);

        wrapper.setState({ error: '' });
        expect(wrapper.find('p').length).to.equal(0);

    });

    it('should call loginWithPassword with the form data', function() {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy}/>
        </MemoryRouter>
      );

      wrapper.find(Login).instance().refs['email'].value = email;
      wrapper.find(Login).instance().refs['password'].value = password;

      wrapper.find('form').simulate('submit');

      expect(spy.called).to.equal(true);
      expect(spy.args[0][0]).to.eql({email});
      expect(spy.args[0][1]).to.equal(password);
    });

    it('should set loginWithPassword callback errors', function () {
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy}/>
        </MemoryRouter>
      );

      wrapper.find('form').simulate('submit');

      spy.args[0][2]({});
      expect(wrapper.find(Login).instance().state['error']).to.not.equal('');

      spy.args[0][2]();
      expect(wrapper.find(Login).instance().state['error']).to.equal('');
    });
  });
}
