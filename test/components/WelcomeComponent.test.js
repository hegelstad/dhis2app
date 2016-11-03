import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';

import { WelcomeComponent } from '../../src/components/WelcomeComponent';

function onClearClick() {

}

describe('<WelcomeComponent />', () => {
    it('should render text', () => {
        const wrapper = shallow(<WelcomeComponent onClick={onClearClick}/>);
        expect(wrapper).to.have.text('Select a region, chiefdom or clinic on the left hand menu to start.');
    });


});
