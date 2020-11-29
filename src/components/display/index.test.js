import Display from './index';
import props from './index';
jest.mock('./index.js');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Display.mockClear();
});

test('color is not undefined', () => {
  const color = props.propTypes.color.mock;
  expect(color).not.toBeUndefined();
});