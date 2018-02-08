/**
 * @jest-environment jsdom
 */
import React from 'react';
import {FaSearch} from 'react-icons/lib/fa';
import { shallow, mount, render } from 'enzyme';
import NavigationItems from '../components/Navigation/NavigationItems/NavigationItems';
import NavigationItem from '../components/Navigation/NavigationItem/NavigationItem';
import SearchBar from '../components/Search/SearchBar/SearchBar';


describe('testing <NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    it('should render one <FaSearch /> components', () => {
         expect(wrapper.find(FaSearch)).toHaveLength(1);
      });
    
    it('should render four <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });
    it('should render four <NavigationItem /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems user />);
        wrapper.setProps({user: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });

    it('should have an exact logout button', () => {
        wrapper.setProps({user: true});
        expect(wrapper.contains(<NavigationItem link="/logout">LOGOUT</NavigationItem>)).toEqual(true);
    });
    it('should have an <li> with class userName if authenticated', () => {
        wrapper.setProps({user: true});
        expect(wrapper.find('.UserName')).toHaveLength(1);
    });

    it('should render correctly', () => {
        
        expect(wrapper).toMatchSnapshot();
      });

   
});
describe('simulates click events', () => { 
    it('should show SearchBar onClick', () => {
        const wrapper = shallow(<NavigationItems />);
        wrapper.setProps({user: true});
        expect(wrapper.state('show')).toEqual('none');
        wrapper.find('.SearchBar').simulate("click");
        expect(wrapper.state('show')).toEqual('inline');
        wrapper.find('.SearchBar').simulate("click");
        expect(wrapper.state('show')).not.toBe('inline');
        expect(wrapper.state('show')).toEqual('none');
      });
});
describe('<SearchBar />', () => { 
    it('should load component and check if props sends', () => {
        const wrapper = shallow(<NavigationItems />);
        const { show } = wrapper.state();
        const searchBar = shallow( <SearchBar show={show} />);
        expect(searchBar.instance().props.show).toEqual('none');       
    });
});
