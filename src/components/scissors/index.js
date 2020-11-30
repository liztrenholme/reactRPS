import React from 'react';
import './scissors.css';
import scissorsImg from './assets/scissors.png';
import PropTypes from 'prop-types';

const Scissors = ({ handleSelect, display, player, choice }) => {
  const name = `${player}scissors`;
  return display ? (
    <div>
      <img 
        className='sketch'
        src={scissorsImg} 
        alt={name}
        onClick={() => handleSelect(name)}
        style={choice === name ? {} : {opacity: '.5'}} />
    </div>
  ) : null;
};

Scissors.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.string,
  choice: PropTypes.string
};
  
export default Scissors;