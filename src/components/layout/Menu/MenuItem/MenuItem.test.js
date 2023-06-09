import { shallow } from 'enzyme';
import React from 'react';
import MenuItem from './MenuItem';
import {
	ItemButtonStyled,
	ItemIconStyled,
	LinkItemStyled,
} from './MenuItemStyled';

describe('Layout component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
			<MenuItem>
				<div>Test</div>
			</MenuItem>,
		);
	});

	it('should render Layout component', () => {
		expect(wrapper).toBeTruthy();
	});

	it('should render ItemButtonStyled component', () => {
		expect(wrapper.find(ItemButtonStyled)).toHaveLength(1);
	});

	it('should render ItemIconStyled component', () => {
		expect(wrapper.find(ItemIconStyled)).toHaveLength(1);
	});

	it('should render LinkItemStyled component', () => {
		expect(wrapper.find(LinkItemStyled)).toHaveLength(1);
	});
});
