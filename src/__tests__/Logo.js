import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Logo from '../components/Logo/Logo';


describe('testing <Logo />', ()=>{
    it('renders without crashing', () => {
        mount(<Logo />);
    });
    it('should find class', () => {
        const wrapper = mount(<Logo />);
        expect(wrapper.find('.BeerTappLogo')).toHaveLength(1);
    });
});