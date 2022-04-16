import React from 'react';
import './scissors.css';
import scissorsImg from './assets/scissors.png';
import PropTypes from 'prop-types';

const Scissors = ({ handleSelect, display, player, choice, small }) => {
  const name = 'scissors';
  return display ? (
    <div>
      <img 
        style={small ? {height: '5em'} : {}}
        src={scissorsImg} 
        alt={name}
        onClick={handleSelect ? () => handleSelect(name) : null}
        className={`player${player} ${choice}-${player} sketch`} />
    </div>
  ) : null;
};

Scissors.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.number,
  choice: PropTypes.string,
  small: PropTypes.bool
};
  
export default Scissors;