import React from 'react';
import './rock.css';
import rockImg from './assets/rock.png';
import PropTypes from 'prop-types';

const Rock = ({ handleSelect, display, player }) => {
  return display ? (
    <div>
      <img
        className='rock-sketch'
        src={rockImg}
        alt={`${player}rock`}
        onClick={() => handleSelect(`${player}rock`)} />
    </div>
  ) : null;
};

Rock.propTypes = {
  handleSelect: PropTypes.func,
  display: PropTypes.bool,
  player: PropTypes.string
};

export default Rock;