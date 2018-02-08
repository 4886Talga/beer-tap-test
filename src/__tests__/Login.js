import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';
import Login from '../containers/Login/Login';
import TextField from '../shared/TextField/TextField';
import Box from '../components/Box/Box';


describe('Login Component', () => {
     it('should render without throwing an error', () => {
      expect(shallow(<Login />).exists(<form></form>)).toBe(true);
    });
    it('should render 2 <TextField /> ', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find(TextField)).toHaveLength(2);
    });
    it('should render <Box /> with prop title="Login"', () => {
        const wrapper = shallow(<Box title="Login" />);
        expect(wrapper.instance().props.title).toEqual('Login');
        
    });
    it('simulates submit events', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
              <Login />
            </MemoryRouter>
          );
        wrapper.find('form').simulate('submit', { preventDefault () {} });
      });
   });
   