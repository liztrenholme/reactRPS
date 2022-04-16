import React from 'react';
import './paper.css';
import PropTypes from 'prop-types';
import paperImg from './assets/paper.png';

const Paper = ({ handleSelect, display, player, choice, small }) => {
  const name = 'paper';
  return display ? (
    <div>
      <img
        style={small ? {height: '5em'} : {}}
        src={paperImg} 
        alt={name}
        onClick={handleSelect ? () => handleSelect(name) : null}
        className={`player${player} ${choice}-${player} paper-sketch`}  />
    </div>
  ) : null;
};

Paper.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.number,
  choice: PropTypes.string,
  small: PropTypes.bool
};
  
export default Paper;