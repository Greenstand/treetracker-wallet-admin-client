import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SendTokens from '../../pages/SendTokens/SendTokens';
import TransferStatus from '../../pages/TransferStatus/TransferStatus';
import Wallet from '../../pages/Wallet/Wallet';
import apiClient from '../../utils/apiClient';
import ClientRoutes from './ClientRoutes';

jest.mock('../../utils/apiClient', () => ({
  get: jest.fn(),
}));

describe('ClientRoutes component', () => {
  it("should render Wallet component when on '/' route", () => {
    apiClient.get.mockResolvedValueOnce({
      data: {
        id: '9d6c674f-ae62-4fab-8d14-ae5de9f14ab8',
        logo_url: 'https://example.com/logo.png',
        tokens_in_wallet: 100,
        wallet: 'test wallet',
      },
    });

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <ClientRoutes />
      </MemoryRouter>,
    );

    expect(wrapper.find(Wallet)).toHaveLength(1);
  });

  it("should render TransferStatus component when on '/transfer-status' route", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/transfer-status']}>
        <ClientRoutes />
      </MemoryRouter>,
    );

    expect(wrapper.find(TransferStatus)).toHaveLength(1);
  });

  it("should render SendTokens component when on '/send-tokens' route", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/send-tokens']}>
        <ClientRoutes />
      </MemoryRouter>,
    );

    expect(wrapper.find(SendTokens)).toHaveLength(1);
  });
});
