import React from 'react';
import './scissors.css';
import scissorsImg from './assets/scissors.png';
import PropTypes from 'prop-types';

const Scissors = ({ handleSelect, display, player, choice }) => {
  const name = 'scissors';
  return display ? (
    <div>
      <img 
        src={scissorsImg} 
        alt={name}
        onClick={() => handleSelect(name)}
        className={`player${player} ${choice}-${player} sketch`} />
    </div>
  ) : null;
};

Scissors.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.number,
  choice: PropTypes.string
};
  
export default Scissors;