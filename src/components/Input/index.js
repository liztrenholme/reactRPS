import React, { Component } from 'react';
import './input.css';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { name, handleTextChange } = this.props;
    return (
      <div className="input">
        <input 
          value={name} 
          onChange={handleTextChange}
          placeholder='Enter your name to play!' />
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string,
  handleTextChange: PropTypes.func
};
  

export default Input;