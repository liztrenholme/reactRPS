/* eslint-disable no-console */
import React, { Component } from 'react';
import './chatBox.css';
import PropTypes from 'prop-types';

class ChatBox extends Component {
  render() {
    const { player, chatData } = this.props;
    console.log('in chatBox:', player, chatData);
    return (
      <div className='chat-box'>
        chat box
      </div>
    );
  }
}

ChatBox.propTypes = {
  player: PropTypes.string,
  chatData: PropTypes.object
};

export default ChatBox;