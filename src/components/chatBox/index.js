/* eslint-disable no-console */
import React, { Component } from 'react';
import './chatBox.css';
import PropTypes from 'prop-types';

class ChatBox extends Component {
  state = {
    input: ''
  }
  messagesEndRef = React.createRef()

  componentDidMount () {
    this.scrollToBottom();
  }
  componentDidUpdate () {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollTop = this.messagesEndRef.current.scrollHeight;
  }

  database = this.props.firebase.database();
  chat = this.database.ref('/chat');

  chatDisc = this.database.ref('/chat/' + Date.now());

  handleChatDisconnect = () =>  {
    this.chatDisc.onDisconnect().set({
      name: this.props.name,
      time:  this.props.firebase.database.ServerValue.TIMESTAMP,
      message: 'has disconnected.',
      idNum: this.props.player
    });
  }

  handleChatTextChange = (e) => this.setState({input: e.target.value})
  handleSendChat = () => {
    if (this.props.name && this.state.input.length) {
      this.chat.push({
        name: this.props.name,
        time: this.props.firebase.database.ServerValue.TIMESTAMP,
        message: this.state.input,
        idNum: this.props.player
      });
      this.setState({input: ''});
    }
  }

  // Update chat on screen when new message detected - ordered by 'time' value
  
  // .on("child_added", function (snapshot) {
    
  //   // If idNum is 0, then its a disconnect message and displays accordingly
  //   // If not - its a user chat message
  //   if (snapshot.val().idNum === 0) {
  //       $("#chat-space").append("<p class=player" + snapshot.val().idNum + "><span>" +
  //           snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  //   } else {
  //       $("#chat-space").append("<p class=player" + snapshot.val().idNum + "><span>" +
  //           snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  //   }

  //   // Keeps div scrolled to bottom on each update.
  //   $("#chat-space").scrollTop($("#chat-space")[0].scrollHeight);
  // });

  render() {
    const { chatData } = this.props;
    return (
      <div className='chat-box'>
        <div className='message-display-box' ref={this.messagesEndRef}>
          {chatData && Object.keys(chatData) ? Object.keys(chatData).sort(j => chatData[j].time)
            .filter(k => chatData[k].message !== 'has disconnected.')
            .map(i => chatData[i].idNum === 1 ? <div className='right-bubble' key={i}><p className='message-bubble message-bubble-right'>{chatData[i].message}</p> <span>{chatData[i].name}</span></div> 
              : <div className='left-bubble' key={i}><span>{chatData[i].name}</span> <p className='message-bubble message-bubble-left'>{chatData[i].message}</p></div>) : null}
        </div>
        {this.props.name ? 
          <input 
            onChange={this.handleChatTextChange} 
            value={this.state.input} /> 
          : <p style={{color: 'darkred'}}>Enter your name above to start chatting.</p>}
        {this.props.name 
          ? <button className='saveBtn' onClick={this.handleSendChat}>Send</button> 
          : null}
      </div>
    );
  }
}

ChatBox.propTypes = {
  player: PropTypes.string,
  name: PropTypes.string,
  chatData: PropTypes.object,
  firebase: PropTypes.object
};

export default ChatBox;