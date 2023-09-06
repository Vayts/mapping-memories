import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { LoginPage } from '@src/pages/LoginPage/LoginPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const middlewares: any[] = [];
const mockStore = configureStore(middlewares);

describe('Login Page', () => {
  const initialState = {
    login: {
      data: {
        login: '',
        password: '',
      },
    },
  };
  const store = mockStore(initialState);
  const component = (
    <MemoryRouter>
      <Provider store={store}><LoginPage /></Provider>
    </MemoryRouter>
  );
	
  it('should render Login Page', () => {
    const { getByTestId } = render(component);
    const page = getByTestId('loginPage');
    expect(page)
      .toBeInTheDocument();
  });
  it('should render login input', () => {
    const { getByLabelText } = render(component);
    const loginInput = getByLabelText('login');
    expect(loginInput)
      .toBeInTheDocument();
  });
  it('should render password input', () => {
    const { getByLabelText } = render(component);
    const passwordInput = getByLabelText('password');
    expect(passwordInput)
      .toBeInTheDocument();
  });
  it('should render confirm button', () => {
    const { getByRole } = render(component);
    const confirmButton = getByRole('button');
    expect(confirmButton)
      .toBeInTheDocument();
  });
  it('calls changeHandler with correct values', () => {
    const { getByLabelText } = render(component);
    const passwordInput = getByLabelText('password');
    fireEvent.change(passwordInput, { target: { value: '1' } });
    const expectedAction = [{
      type: 'login/setLoginData',
      payload: {
        key: 'password',
        value: '1',
      },
    }];
    expect(store.getActions()).toEqual(expectedAction);
  });
  it('calls submitHandler with correct values', async () => {
    const initialState = {
      login: {
        data: {
          login: '1',
          password: '2',
        },
      },
    };
    const store = mockStore(initialState);
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}><LoginPage /></Provider>
      </MemoryRouter>,
    );
    const expectedAction = [{
      type: 'LOGIN_REQUEST',
      payload: {
        values: {
          login: '1',
          password: '2',
        },
      },
    }];
    const button = getByRole('button');
    fireEvent.click(button);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
