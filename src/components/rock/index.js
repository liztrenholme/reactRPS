import React from 'react';
import './rock.css';
import rockImg from './assets/rock.png';
import PropTypes from 'prop-types';

const Rock = ({ handleSelect, display, player, choice }) => {
  const name = 'rock';
  return display ? (
    <div>
      <img
        src={rockImg}
        alt={name}
        onClick={() => handleSelect(name)}
        className={`player${player} ${choice}-${player} rock-sketch`}  />
    </div>
  ) : null;
};

Rock.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.number,
  choice: PropTypes.string
};

export default Rock;