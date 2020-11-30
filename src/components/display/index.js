import React, { Component } from 'react';
import './display.css';
import PropTypes from 'prop-types';
import Rock from '../rock';
import Paper from '../paper';
import Scissors from '../scissors';

class Display extends Component {
  render() {
    const { player, isTurn, handleSelect } = this.props;
    return (
      <div className='display' style={isTurn ? {border: '3px', borderColor: 'blue', borderStyle: 'solid'} : {}}>
        <Rock display={true} player={player} handleSelect={handleSelect} />
        <Paper display={true} player={player} handleSelect={handleSelect} />
        <Scissors display={true} player={player} handleSelect={handleSelect} />
      </div>
    );
  }
}

Display.propTypes = {
  player: PropTypes.string,
  isTurn: PropTypes.bool,
  handleSelect: PropTypes.func
};

export default Display;