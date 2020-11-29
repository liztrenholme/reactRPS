import React, { Component } from 'react';
import './display.css';
import PropTypes from 'prop-types';

class Display extends Component {
  render() {
    return (
      <div className='display'>
        <div style={{
          width: '20em', 
          height: '10em', 
          backgroundColor: this.props.color, 
          border: '5px solid #fff',
          borderRadius: '15px'
        }}
        />
      </div>
    );
  }
}

Display.propTypes = {
  color: PropTypes.string
};

export default Display;