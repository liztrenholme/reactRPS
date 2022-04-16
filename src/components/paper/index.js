import React from 'react';
import './paper.css';
import PropTypes from 'prop-types';
import paperImg from './assets/paper.png';

const Paper = ({ handleSelect, display, player, choice }) => {
  const name = 'paper';
  return display ? (
    <div>
      <img 
        src={paperImg} 
        alt={name}
        onClick={() => handleSelect(name)}
        className={`player${player} ${choice}-${player} paper-sketch`}  />
    </div>
  ) : null;
};

Paper.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.number,
  choice: PropTypes.string
};
  
export default Paper;