import '@testing-library/jest-dom';

const blob = 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7';
global.URL.createObjectURL = jest.fn(() => blob);
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: jest.fn((value) => {
        return value;
      }),
    };
  },
}));
