import React, { Component } from 'react';
import './main.css';
import Display from '../display/index';
import Input from '../Input/index';
import InfoIconCircle from './assets/infoicon.png';
// import {  } from '../modules/index.js';
import json from '../../../package.json';
import Firebase from 'firebase';
import config from '../../config';

Firebase.initializeApp(config.firebase);

class Main extends Component {
state = {
  name: '',
  error: '',
  showInstructions: false,
  p1turn: true,
  p2turn: false,
  nameChosen: false
}

writeUserData = () => {
  Firebase.database().ref('/').set(this.state);
  // eslint-disable-next-line no-console
  console.log('DATA SAVED');
}

getUserData = () => {
  let ref = Firebase.database().ref('/');
  ref.on('value', snapshot => {
    const state = snapshot.val();
    this.setState(state);
  });
  // eslint-disable-next-line no-console
  console.log('DATA RETRIEVED');
}

componentDidMount() {
  // this.getUserData();
}

// componentDidUpdate(prevProps, prevState) {
//   // check on previous state
//   // only write when it's different with the new state
//   if (prevState !== this.state) {
//     this.writeUserData();
//   }
// }

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
}

handleSelectChoice = (choice) => {
  // eslint-disable-next-line no-console
  console.log('choice is', choice);
}

render() {
  const { name, contrast, error, p1turn, p2turn, nameChosen } = this.state;
  return (
    <div className="main">
      <h1 className='header' style={{color: contrast}}>Rock, Paper, Scissors</h1>
      <div className='infoIcon'>
        <img 
          src={InfoIconCircle} 
          onClick={this.handleShowMobileInstructions}
          width='20px'
          height='20px'
          alt='info-icon' />
      </div>

      {/* <div className='buttonBox'>
        <button onClick={this.convertToHex} 
          className={mode === 'hex' ? 'active' : 'inactive'}>
                  Hex
        </button>
        <button onClick={this.convertToRgb} 
          className={mode === 'rgb' ? 'active' : 'inactive'}>
                  RGB
        </button>
        <button onClick={this.convertToColorName} 
          className={mode === 'colorName' ? 'active' : 'inactive'}>
                  Color Name
        </button>
      </div> */}
      <div className='inputWithSave'>
        {nameChosen ? 
          (<h1 className='name-display'>Hi {name}, you are player one!</h1>)
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
      <div>
        <h3 style={{color: 'darkRed'}}>{error}</h3>
      </div>
      <div className='gameboard'>
        <div className='left-side'>
          <Display player='p1' isTurn={p1turn} handleSelect={this.handleSelectChoice} />
        </div>
        <div className='right-side'>
          <Display player='p2' isTurn={p2turn} handleSelect={this.handleSelectChoice} />
        </div>
      </div>
      <h3>Version: {json.version}</h3>
    </div>
  );
}
}


export default Main;