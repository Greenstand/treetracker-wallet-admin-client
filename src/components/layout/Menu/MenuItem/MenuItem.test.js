import { shallow } from 'enzyme';
import React from 'react';
import MenuItem from './MenuItem';
import {
  ItemButtonStyled,
  ItemIconStyled,
  LinkItemStyled,
} from './MenuItemStyled';
import LinkItem from './LinkItem';

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

  it('should render LinkItem component(s)', () => {
    const linkItems = wrapper.find(LinkItem);
    expect(linkItems.length).toBeGreaterThanOrEqual(1);
  });

  it('LinkItems rendering links correctly', () => {
    const linkItems = wrapper.find(LinkItem);
    let itemButton, itemIcon, itemLink;
    linkItems.map(linkItem => {
      itemButton = linkItem.find(ItemButtonStyled);
      itemIcon = linkItem.find(ItemIconStyled);
      itemLink = linkItem.find(LinkItemStyled);
      expect(itemButton).toBeTruthy();
      expect(itemIcon).toBeTruthy();
      expect(itemLink).toBeTruthy();
    });
  });
});
