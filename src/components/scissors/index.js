import React from 'react';
import './scissors.css';
import scissorsImg from './assets/scissors.png';
import PropTypes from 'prop-types';

const Scissors = ({ handleClick, display }) => {
  return display ? (
    <div>
      <img 
        src={scissorsImg} 
        alt='scissors'
        onClick={handleClick} />
    </div>
  ) : null;
};

Scissors.propTypes = {
  handleClick: PropTypes.func,
  display: PropTypes.bool
};
  
export default Scissors;