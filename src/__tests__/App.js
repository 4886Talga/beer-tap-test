/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Layout from '../components/Layout/Layout';
import firebase from '../components/firebase';
import Gallery from '../containers/Gallery/Gallery';
import Dashboard from '../containers/Dashboard/Dashboard';
import Home from '../components/Home/Home';
import ItemDetail from '../components/ItemDetails/ItemDetail';
import Login from '../containers/Login/Login';
import Logout from '../containers/Logout/Logout';
import CreateAccount from '../containers/CreateAccount/CreateAccount';
import FavoriteItem from '../containers/FavoriteItem/FavoriteItem';
import SearchResault from '../components/Search/SearchResault/SearchResault';
import NotFoundPage from '../shared/NotFoundPage/NotFoundPage';

describe('testing <App />', () => {
    // let wrapper;

    // beforeEach(() => {
    //     wrapper = shallow(<App />);
    // });
    test('valid path should not redirect to 404', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={[ '/gallery' ]}>
            <App />
          </MemoryRouter>
        );
        expect(wrapper.find(Gallery)).toHaveLength(1);
    });
    test('invalid path should redirect to 404', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={[ '/random' ]}>
            <App />
          </MemoryRouter>
        );
        expect(wrapper.find(Home)).toHaveLength(0);
        expect(wrapper.find(Gallery)).toHaveLength(0);
        expect(wrapper.find(Dashboard)).toHaveLength(0);
        expect(wrapper.find(Login)).toHaveLength(0);
        expect(wrapper.find(Logout)).toHaveLength(0);
        expect(wrapper.find(CreateAccount)).toHaveLength(0);
        expect(wrapper.find(FavoriteItem)).toHaveLength(0);
        expect(wrapper.find(SearchResault)).toHaveLength(0);
        expect(wrapper.find(NotFoundPage)).toHaveLength(1);
      });
      
      test('valid path should not redirect to 404', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={[ '/' ]}>
            <App />
          </MemoryRouter>
        );
        expect(wrapper.find(Home)).toHaveLength(1);
        expect(wrapper.find(NotFoundPage)).toHaveLength(0);
      });
});