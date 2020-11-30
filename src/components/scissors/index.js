import React from 'react';
import './scissors.css';
import scissorsImg from './assets/scissors.png';
import PropTypes from 'prop-types';

const Scissors = ({ handleSelect, display, player }) => {
  return display ? (
    <div>
      <img 
        className='sketch'
        src={scissorsImg} 
        alt={`${player}scissors`}
        onClick={() => handleSelect(`${player}scissors`)} />
    </div>
  ) : null;
};

Scissors.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.string
};
  
export default Scissors;