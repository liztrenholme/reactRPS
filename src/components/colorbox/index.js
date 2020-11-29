import React, { Component } from 'react';
import './colorbox.css';
import Display from '../display/index';
import Input from '../Input/index';
import InfoIconCircle from './assets/infoicon.png';
import { 
  getContrastColor, 
  hexCodes, 
  colorNames, 
  getSecondVal, 
  rgbVals } from '../modules/index.js';
import json from '../../../package.json';

class Colorbox extends Component {
state = {
  color: '#ffffff',
  contrast: '#000000',
  colorList: [],
  mode: 'hex',
  error: '',
  showInstructions: false
}

handleModeChange = (mode) => () => {
  this.setState({ mode, color: '', contrast: '', error: '' });
}

handleColorChange = (e) => {
  let value = e.target.value;
  this.setColorInState(value);
}

setColorInState = (color) => {
  let { contrast } = this.state;
  let mode = '';
  if (color && color.startsWith('#')) {
    mode = 'hex';
    contrast = getContrastColor(color);
  }
  if (color && color.startsWith('rgb')) {
    mode = 'rgb';
    contrast = getContrastColor(color);
  }
  if (color && !color.startsWith('#') && !color.startsWith('rgb')) {
    mode = 'colorName';
    if (color && color.length) {
      const temp = colorNames[color];
      if (temp) {
        contrast = getContrastColor(temp);
        this.setState({contrast, error: ''});
      }
    }
  }
  if (!color) {
    contrast = '';
  }
  if (color === '') {
    contrast = '';
  }
  this.setState({ color: color, contrast, mode, error: '' });
}

chooseColor = (item) => () => {
  this.setColorInState(item);
}

saveColor = () => {
  let list = this.state.colorList;
  const { color } = this.state;
  if (color.length > 2) {
    list.push(color);
  }
  this.setState({colorList: list, error: ''});
}

removeItem = (item) => () => {
  let list = this.state.colorList;
  list.splice(list.indexOf(item), 1);
  this.setState({colorList: list, error: ''});
}

swapColors = () => {
  const { contrast, color } = this.state;
  let { mode } = this.state;
  if (contrast.startsWith('#')) {
    mode = 'hex';
  }
  if (!contrast.startsWith('#') && !contrast.startsWith('rgb(')) {
    mode = 'colorName';
  }
  this.setState({ contrast: color, color: contrast, error: '', mode });
}

convertToHex = () => {
  const col = this.state.color;
  let color = '';
  if (col && this.state.mode === 'rgb') {
    let temp = col.split('(')[1];
    temp = temp.split(')')[0];
    temp = temp.split(',');
    temp = temp.map(i => Number(i));
    const R = temp[0]/16;
    const G = temp[1]/16;
    const B = temp[2]/16;
    const R1 = hexCodes[Math.floor(R)];
    const G1 = hexCodes[Math.floor(G)];
    const B1 = hexCodes[Math.floor(B)];
    const R2 = hexCodes[getSecondVal(R)];
    const G2 = hexCodes[getSecondVal(G)];
    const B2 = hexCodes[getSecondVal(B)];
    const contrast = getContrastColor(`#${R1}${R2}${G1}${G2}${B1}${B2}`);
    this.setState({
      color: `#${R1}${R2}${G1}${G2}${B1}${B2}`, 
      mode: 'hex', 
      contrast, 
      error: ''
    });
    color = `#${R1}${R2}${G1}${G2}${B1}${B2}`;
  }
  if (col && this.state.mode === 'colorName') {
    const name = col.toLowerCase();
    const contrast = getContrastColor(colorNames[name]);
    this.setState({color: colorNames[name], mode: 'hex', contrast, error: ''});
    color = colorNames[name];
  }
  return color;
}

convertToRgb = () => {
  const col = this.state.color;
  let error = '';
  const getValsFromHex = (vals = '') => {
    let temp = vals.toUpperCase();
    temp = temp.split('');
    const val1 = (rgbVals[temp[1]] * 16) + (rgbVals[temp[2]]);
    const val2 = (rgbVals[temp[3]] * 16) + (rgbVals[temp[4]]);
    const val3 = (rgbVals[temp[5]] * 16) + (rgbVals[temp[6]]);
    return `rgb(${val1}, ${val2}, ${val3})`;
  };
  if (this.state.mode === 'hex') {
    if (col.length === 7) {
      const color = getValsFromHex(col);
      this.setState({color, mode: 'rgb', error });
    } else {
      error = 'Hex must have 6 characters';
      this.setState({error});
    }
  }
  if (this.state.mode === 'colorName') {
    const name = col.toLowerCase();
    let color = getValsFromHex(colorNames[name]);
    if (color.includes('NaN')) {
      color = col;
      error = 'Not a valid color';
    }
    this.setState({color, mode: 'rgb', error });
  }
}

convertToColorName = () => {
  const col = this.state.color;
  const hexToName = (color = '') => {
    let newColorName = '';
    const temp = Object.keys(colorNames).find(i => colorNames[i] === color.toLowerCase());
    if (temp) {
      newColorName = temp;
    } else {
      this.setState({error: 'No CSS color name for this code.', contrast: ''});
    }
    this.setState({color: newColorName, mode: 'colorName'});
  };
  if (this.state.mode === 'hex') {
    hexToName(col);
  }
  if (this.state.mode === 'rgb') {
    const hexCol = this.convertToHex().toLowerCase();
    hexToName(hexCol);
  }
}

getColorOptions = () => Object.keys(colorNames).map(i => {
  return (
    <option key={`${colorNames[i]}${i}`} value={i}>
      {i}
    </option>
  );
})

handleShowMobileInstructions = () => {
  this.state.showInstructions 
    ? this.setState({showInstructions: false}) 
    : this.setState({showInstructions: true});
}

render() {
  const { colorList, color, contrast, mode, error, showInstructions } = this.state;
  return (
    <div className="main">
      <h1 className='header' style={{color: contrast}}>Colorbox</h1>
      <div className='infoIcon'>
        <img 
          src={InfoIconCircle} 
          onClick={this.handleShowMobileInstructions}
          width='20px'
          height='20px'
          alt='info-icon' />
      </div>
      {showInstructions ? 
        <div className='mobileInstructions'>
          <p>Display the color associated with the hex code, rgb value, or CSS color name typed into 
            the input, or select a color name from the dropdown. Try: rgb(180, 80, 180), 
            #4ba4ba or salmon.</p>
          <p>Swap to view contrasting color, convert color code to hex, rgb value or color 
            name (if applicable), tap/click saved color to view again, double click/tap or 
            drag to remove a saved color from the list.</p> 
        </div> : null}
      <div className='buttonBox'>
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
      </div>
      <div className='inputWithSave'>
        <Input 
          color={color}
          handleColorChange={this.handleColorChange}
          mode={mode}
        />
        {color ?
          <button 
            className='saveBtn' 
            onClick={this.saveColor}>
                  Save
          </button> : null}
      </div>
      <div>
        <h3 style={{color: 'darkRed'}}>{error}</h3>
      </div>
      <Display color={color} />
      <div className='btnBox'>
        {contrast ? 
          <button className='swapBtn' onClick={this.swapColors}>Show Opposite</button> : null}
        <select
          className='colorSelect' 
          onChange={this.handleColorChange}>
          <option value=''>Choose color...</option>
          {this.getColorOptions()}
        </select>
      </div>
      {contrast ?
        <div style={{
          display: 'flex', 
          flexDirection: 'row', 
          height: '1em'
        }}>
          <div style={{
            backgroundColor: contrast, 
            width: '20px', 
            height: '20px',
            marginRight: '0.5em',
            borderRadius: '5px'
          }} />
          <span style={{
            fontSize: '1.2em', 
            fontWeight: 'bold'
          }}>Opposite: {contrast}</span>
        </div> : null}
         
      <div className='chosenBox'>
        {colorList && colorList.length ? colorList.map(i => {
          return(
            <div 
              className='colorItem' 
              key={i}
              draggable 
              onClick={this.chooseColor(i)}
              onDrag={this.removeItem(i)}
              onDoubleClick={this.removeItem(i)}>
              <div style={{
                width: '2em', 
                height: '2em', 
                backgroundColor: i,
                borderRadius: '8px'
              }}  />
              <span className='colorName'>{i}</span>
            </div>);
        }) : null}
      </div>
      <div className='instructions'>
            Display the color associated with the hex code, rgb value, or CSS color name typed into 
            the input, or select a color name from the dropdown. Try: rgb(180, 80, 180), 
            #4ba4ba or salmon.
        <br /><br />
            Swap to view contrasting color, convert color code to hex, rgb value or color 
            name (if applicable), tap/click saved color to view again, double click/tap or 
            drag to remove saved color.
      </div>
      <h3>Version: {json.version}</h3>
    </div>
  );
}
}


export default Colorbox;