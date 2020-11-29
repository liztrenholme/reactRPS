import Input from './index';
import props from './index';
jest.mock('./index.js');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Input.mockClear();
});

test('color is not undefined', () => {
  const color = props.propTypes.color.mock;
  expect(color).not.toBeUndefined();
});

test('handleColorChange is not undefined', () => {
  const handleColorChange = props.propTypes.handleColorChange.mock;
  expect(handleColorChange).not.toBeUndefined();
});