import React from 'react';
import { shallow, mount, render } from 'enzyme';
import * as firebase from 'firebase';
import Get, { mockGet } from '../__mocks__/get';
import Gallery from '../containers/Gallery/Gallery';
import Axios from '../axios-beers';

jest.mock('../__mocks__/get');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Get.mockClear();
  mockGet.mockClear();
});


it('should call methodName during componentDidMount', () => {
    const methodNameFake = jest.spyOn(Gallery.prototype, 'componentDidMount');
    const wrapper = mount(<Gallery />);
    expect(methodNameFake).toHaveBeenCalledTimes(1);
});

it('componentDidMount that calls firebase.auth().onAuthStateChanged', async () => {
    const wrapper = mount(<Gallery />);
    jest.spyOn(firebase, 'auth').mockImplementation(() => {
        return Promise.resolve({
            user: {
              displayName: 'redirectResultTestDisplayName',
              email: 'redirectTest@test.com',
              emailVerified: true
            }
          });
      });
    
    const result = await firebase.auth(); 
    expect(result).toEqual({
      user: {
        displayName: 'redirectResultTestDisplayName',
        email: 'redirectTest@test.com',
        emailVerified: true
      }
    });
   
    expect(firebase.auth).toHaveBeenCalled();
    
  });
  
  it('componentDidMount that calls axios.get()', async () => {
    // const wrapper = mount(<Gallery />);
    jest.spyOn(Axios, 'get').mockImplementation(() => {
        return Promise.resolve({
            beer: 'niceBeer'
        });
      });
    
    const result = await Axios.get('/beers.json'); 
    expect(result).toEqual({
        beer: 'niceBeer'
    });
   
    expect(Axios.get).toHaveBeenCalled();
    
  });
