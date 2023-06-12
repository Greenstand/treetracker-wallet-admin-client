import { shallow } from 'enzyme';
import React from 'react';
import Layout from './Layout';
import { StyledContent } from './LayoutStyled';
import Menu from './Menu/Menu';

describe('Layout component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Layout>
        <div>Test</div>
      </Layout>,
    );
  });

  it('should render Layout component', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render Menu component', () => {
    expect(wrapper.find(Menu)).toHaveLength(1);
  });

  it('should render StyledContent component', () => {
    expect(wrapper.find(StyledContent)).toHaveLength(1);
  });
});
