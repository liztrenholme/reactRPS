import React from 'react';
import './rock.css';
import rockImg from './assets/rock.png';
import PropTypes from 'prop-types';

const Rock = ({ handleSelect, display, player, choice, small }) => {
  const name = 'rock';
  return display ? (
    <div>
      <img
        style={small ? {height: '5em'} : {}}
        src={rockImg}
        alt={name}
        onClick={handleSelect ? () => handleSelect(name) : null}
        className={`player${player} ${choice}-${player} rock-sketch`}  />
    </div>
  ) : null;
};

Rock.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.number,
  choice: PropTypes.string,
  small: PropTypes.bool
};

export default Rock;