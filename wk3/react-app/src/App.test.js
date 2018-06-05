import React from 'react';
import App from './App';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

describe("Test suite for App component", function() {

  it("only one element in App class", function() {
    const wrapper = shallow(<App />); // shallow - only first level of components
    expect(wrapper.find(".App")).length(1);
  });

  it('Dog List contains two dogs', function() {
    const wrapper = mount(<App />); // deep
    expect(wrapper.find('Dogs')
                  .find('DogItem')).length(2);
  });

  // testing data entry and form submission
  it('successfully adds dog to list when form is submitted', function() {
    const wrapper = mount(<App/>);
    const adddog = wrapper.find('AddDog');

    adddog.find('#dogName').get(0).value = 'Lola';
    adddog.find('#imageURL').get(0).value = 'https://static.pexels.com/photos/54386/pexels-photo-54386.jpeg';
    adddog.find('#dogBreed').get(0).value = 'Beagle';

    const form = adddog.find('form');
    form.simulate('submit');
    expect(wrapper.find('Dogs')
                  .find('DogItem')).length(3);
    expect(wrapper.state().dogs[2].name == 'Lola');
  });

  // testing links
  it('removes dog from list when deleted', function() {
    const wrapper = mount(<App/>);
    const deleteLink = wrapper.find('a').first();

    deleteLink.simulate('click');

    expect(wrapper.find('Dogs')
                  .find('DogItem')).length(1);
  });

});
