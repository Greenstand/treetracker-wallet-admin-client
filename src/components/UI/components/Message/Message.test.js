import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from '@mui/material';
import Message from './Message';

describe('Message component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Message message="" onClose={() => {}} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the Alert component with the correct severity', () => {
    const wrapper = shallow(<Message message="" onClose={() => {}} />);
    const alertComponent = wrapper.find(Alert);

    expect(alertComponent).toHaveLength(1);
    expect(alertComponent.props().severity).toBe('error');
  });

  it('displays the provided error message', () => {
    const message = 'An error occurred.';
    const wrapper = shallow(<Message message={message} onClose={() => {}} />);
    const alertComponent = wrapper.find(Alert);

    expect(alertComponent.props().children).toBe(message);
  });

  it('calls the onClose function when the Alert is closed', () => {
    const onCloseMock = jest.fn();
    const wrapper = shallow(<Message message="" onClose={onCloseMock} />);
    const alertComponent = wrapper.find(Alert);

    alertComponent.props().onClose();

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
