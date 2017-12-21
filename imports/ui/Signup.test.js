import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect } from 'chai';
import sinon from 'sinon'
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Signup } from './Signup';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Signup', function () {

    it('should show error messages', function () {
        const error = 'This is not working'
        const wrapper = shallow(
            <Signup createUser={() => {}}/>
        );
        wrapper.setState({error});
        expect(wrapper.find('p').text()).to.equal(error);

        wrapper.setState({ error: '' });
        expect(wrapper.find('p').length).to.equal(0);

    });

    it('should call createUser with the form data', function() {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Signup createUser={spy}/>
        </MemoryRouter>
      );

      wrapper.find(Signup).instance().refs['email'].value = email;
      wrapper.find(Signup).instance().refs['password'].value = password;

      wrapper.find('form').simulate('submit');

      expect(spy.called).to.equal(true);
      expect(spy.args[0][0]).to.eql({email, password});
    });

    it('should set error if short password', function() {
      const email = 'andrew@test.com';
      const password = '123';
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Signup createUser={spy}/>
        </MemoryRouter>
      );

      wrapper.find(Signup).instance().refs['email'].value = email;
      wrapper.find(Signup).instance().refs['password'].value = password;

      wrapper.find('form').simulate('submit');

      expect(wrapper.find(Signup).instance().state.error).to.have.lengthOf.above(0);
    });

    it('should set createUser callback errors', function () {
      const password = 'password123'
      const reason = 'This is why it failed';
      const spy = sinon.spy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Signup createUser={spy}/>
        </MemoryRouter>
      );
      wrapper.find(Signup).instance().refs['password'].value = password;

      wrapper.find('form').simulate('submit');

      spy.args[0][1]({ reason });
      expect(wrapper.find(Signup).instance().state['error']).to.equal(reason);

      spy.args[0][1]();
      expect(wrapper.find(Signup).instance().state['error']).to.equal('');
    });

  });
}
