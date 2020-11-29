import React, { Component } from 'react';
import './input.css';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { color, handleColorChange } = this.props;
    return (
      <div className="input">
        <input value={color} 
          onChange={handleColorChange} />
      </div>
    );
  }
}

Input.propTypes = {
  color: PropTypes.string,
  handleColorChange: PropTypes.func,
  mode: PropTypes.string
};
  

export default Input;