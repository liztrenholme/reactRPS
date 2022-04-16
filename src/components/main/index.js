/* eslint-disable no-console */

// 1. call to db to check for players
// 2. if no players, assign to player one, if one player, assign to player two, otherwise say full
// 3. if two players present, first turn starts
// 4. player 1 selects and call is sent to db, second turn activated


import React, { Component } from 'react';
import './main.css';
import Display from '../display/index';
import Input from '../Input/index';
// import InfoIconCircle from './assets/infoicon.png';
import json from '../../../package.json';
import Firebase from 'firebase';
import config from '../../config';
import ChatBox from '../chatBox';

window.config = config;

if (window && window.config) {
  Firebase.initializeApp(window.config);
}

class Main extends Component {
state = {
  name: '',
  player: null,
  error: '',
  showInstructions: false,
  nameChosen: false,
  choice: '',
  currentPlayerTurn: null,
  currentPlayers: 0,
  chatData: {},
  playerOneExists: false,
  playerTwoExists: false,
  winner: null,
  opponentChoice: null
}

getChatData = () => {
  let ref = Firebase.database().ref('/chat');
  ref.on('value', snapshot => {
    const chatData = snapshot.val();
    this.setState({chatData});
  });
}

playAgain = () => {
  this.setState({
    choice: '',
    currentPlayerTurn: null,
    currentPlayers: 0,
    chatData: {},
    playerOneExists: false,
    playerTwoExists: false,
    winner: null,
    opponentChoice: null
  });
  this.gameStart();
}

getGameData = () => {
  let ref = Firebase.database().ref('/game/players');
  let playerOneExists;
  let playerTwoExists;
  let currentPlayerTurn;
  let currentPlayers;
  const currentTurnRef = Firebase.database().ref('turn');
  ref.on('value', snapshot => {
    playerOneExists = snapshot.child('1').exists();
    playerTwoExists = snapshot.child('2').exists();
    
    this.setState({playerOneExists, playerTwoExists});
  });
  currentTurnRef.on('value', snapshot => {
    currentPlayerTurn = snapshot.val();
    this.setState({currentPlayerTurn});
  });
  const playerStatus = Firebase.database().ref('players');
  playerStatus.on('value', snapshot => {
    currentPlayers = snapshot.numChildren();
    this.setState({currentPlayers});
  });
}

gameStart = () => {
  const currentTurnRef = Firebase.database().ref('turn');
  const chatDisc = Firebase.database().ref('/chat/' + Date.now());
  // For adding disconnects to the chat with a unique id (the date/time the user entered the game)
  // Needed because Firebase's '.push()' creates its unique keys client side,
  // so you can't ".push()" in a ".onDisconnect"
  // var chatDataDisc = database.ref("/chat/" + Date.now());

  // Checks for current players, if theres a player one connected, then the user becomes player 2.
  // If there is no player one, then the user becomes player 1
  let ref = Firebase.database().ref('players');
  let playerOneExists;
  let playerTwoExists;
  let {winner, opponentChoice, player} = this.state;
  ref.on('value', snapshot => {
    const gameData = snapshot.val();
    console.log('what is coming back for gamedata??', gameData);
    playerOneExists = snapshot.child(1).exists();
    playerTwoExists = snapshot.child(2).exists();

    if (gameData && gameData[1] && gameData[1].choice && gameData[2] && gameData[2].choice) {
      const playerOneChoice = gameData[1].choice;
      const playerTwoChoice = gameData[2].choice;
      console.log('CHOICES', playerOneChoice, playerTwoChoice);
      if (playerOneChoice === 'paper' && playerTwoChoice === 'paper') {
        winner = 'tie';
      }
      if (playerOneChoice === 'rock' && playerTwoChoice === 'rock') {
        winner = 'tie';
      }
      if (playerOneChoice === 'scissors' && playerTwoChoice === 'scissors') {
        winner = 'tie';
      }
      if (playerOneChoice === 'paper' && playerTwoChoice === 'rock') {
        winner = gameData[1].name;
      }
      if (playerOneChoice === 'paper' && playerTwoChoice === 'scissors') {
        winner = gameData[2].name;
      }
      if (playerOneChoice === 'rock' && playerTwoChoice === 'paper') {
        winner = gameData[2].name;
      }
      if (playerOneChoice === 'rock' && playerTwoChoice === 'scissors') {
        winner = gameData[1].name;
      }
      if (playerOneChoice === 'scissors' && playerTwoChoice === 'rock') {
        winner = gameData[2].name;
      }
      if (playerOneChoice === 'scissors' && playerTwoChoice === 'paper') {
        winner = gameData[1].name;
      }
      player === 1 ? opponentChoice = gameData[2].choice : gameData[1].choice;
    }
    
    this.setState({playerOneExists, playerTwoExists, winner, opponentChoice});
  });
  console.log('CURRENT PLAYERS', this.state.currentPlayers, playerOneExists, playerTwoExists);
  if (this.state.currentPlayers < 2) {
    let {player} = this.state;
    if (playerOneExists && !winner) {
      player = 2;
      currentTurnRef.set(1);
      this.setState({currentTurn: 1});
    }
    else {
      player = 1;
    }

    // Creates key based on assigned player number
    const playerRef = Firebase.database().ref('/players/' + player);
    // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
    playerRef.set({
      name: this.state.name,
      wins: 0,
      losses: 0,
      choice: null
    });

    // On disconnect remove this user's player object
    playerRef.onDisconnect().remove();

    // If a user disconnects, set the current turn to 'null' so the game does not continue
    currentTurnRef.onDisconnect().remove();

    // Send disconnect message to chat with Firebase server generated timestamp and id of '0' to denote system message
    chatDisc.onDisconnect().set({
      name: this.state.name,
      time: Firebase.database.ServerValue.TIMESTAMP,
      message: 'has disconnected.',
      idNum: 0
    });

    this.setState({player});
  }
  else {
    if (winner) {
      this.setState({error: `The winner is ${winner}!`});
    } else {
    // If current players is "2", will not allow the player to join
      this.setState({error: 'Sorry, Game Full! Try Again Later!'});
    }
  }
}

componentDidMount() {
  this.getChatData();
  this.getGameData();
  // this.gameStart();
}

handleShowMobileInstructions = () => {
  this.state.showInstructions 
    ? this.setState({showInstructions: false}) 
    : this.setState({showInstructions: true});
}

handleTextChange = (e) => {
  const name = e.target.value;
  this.setState({name});
}

saveName = () => {
  // call to db to save name goes here
  this.setState({nameChosen: true});
  this.gameStart();
  // this.setPlayer();
}

handleSelectChoice = (choice) => {
  console.log('choice is', choice);
  // const chosen = choice.split('1')[1] || choice.split('2')[1];
  this.setState({choice});
  const {name, player} = this.state;
  const playerRef = Firebase.database().ref('/players/' + player);
  const currentTurnRef = Firebase.database().ref('turn');
  playerRef.set({
    name: name,
    wins: 0,
    losses: 0,
    choice: choice
  });
  this.state.currentPlayerTurn === 1 ? currentTurnRef.set(2) : currentTurnRef.set(1);
  this.state.currentPlayerTurn === 1 ? this.setState({currentPlayerTurn: 2}) : this.setState({currentPlayerTurn: 1});
}

render() {
  const { 
    winner, 
    name, 
    error, 
    currentPlayerTurn,
    nameChosen, 
    choice,
    player, 
    chatData, 
    playerOneExists, 
    playerTwoExists, 
    currentPlayers,
    opponentChoice
  } = this.state;
  console.log('state:::', this.state);
  return (
    <div className="main">
      <div className='main-container'>
        <h1 className='header'>Rock, Paper, Scissors</h1>
        {/* <div className='infoIcon'>
          <img 
            src={InfoIconCircle} 
            onClick={this.handleShowMobileInstructions}
            width='20px'
            height='20px'
            alt='info-icon' />
        </div> */}
        <div className='inputWithSave'>
          {nameChosen && player ? 
            (<h1 className='name-display'>Hi {name}, you are player {player}!  {currentPlayers < 2 ? 'Waiting for player two to join...' : null} </h1>)
            : (<div className='inputWithSave'>
              <Input 
                name={name}
                handleTextChange={this.handleTextChange}
              />
              {name ?
                <button 
                  className='saveBtn' 
                  onClick={this.saveName}>
                  Add my name!
                </button> : null}
            </div>)}
        </div>
        {!winner && playerOneExists && playerTwoExists ? <div>
          {currentPlayerTurn === player ? <h3 style={{color: 'darkblue'}}>Your turn!</h3> 
            : <h3 style={{color: 'darkblue'}}>Waiting for opponent...</h3>}
        </div> : null}
        <div>
          <h3 style={{color: 'darkRed'}}>{error}</h3>
        </div>
        {winner ? <div>
          <h1 style={{color: 'darkRed'}}>The winner is {winner}!</h1>
        </div> : null}
        {!winner && playerOneExists && playerTwoExists ? <div className='gameboard'>
          <div className='left-side'>
            <Display 
              winner={winner}
              player={1} 
              isTurn={!winner && currentPlayerTurn === 1 && player === 1} 
              handleSelect={this.handleSelectChoice}
              choice={choice}
              opponentChoice={player === 1 && opponentChoice ? opponentChoice : null} />
          </div>
          <div className='right-side'>
            <Display 
              winner={winner}
              player={2} 
              isTurn={!winner && currentPlayerTurn === 2 && player === 2} 
              handleSelect={this.handleSelectChoice}
              choice={choice}
              opponentChoice={player === 2 && opponentChoice ? opponentChoice : null} />
          </div> 
        </div> : null}
        {winner ?
          <button 
            className='saveBtn' 
            onClick={this.playAgain}>
                  Play again?
          </button> : null}
        <div>
          <ChatBox
            player={player}
            name={name}
            chatData={chatData}
            firebase={Firebase} />
        </div>
      </div>
      <h3>Version: {json.version}</h3>
    </div>
  );
}
}


export default Main;