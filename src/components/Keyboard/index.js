// Packages
import React, { Component } from 'react'
// Components
import Key from 'components/Key'
// Data
import { keys } from 'data/keys'

export default class Keyboard extends Component {
  render() {
    return(
      <KeyboardWithStyle>
        { keys.slice(0, 41).map( ( key, index ) => {
          return ( <Key key={ index } paths={ key.paths } width={ key.width } height={ key.height } /> )
        })}
        <div className="keyWrap">
          <Key className="enter" paths={ keys[41].paths } width={ keys[41].width } height={ keys[41].height } />
        </div>
        { keys.slice(42, 76).map( ( key, index ) => {
          return ( <Key key={ index } className={ index === 30 ? 'space' : '' } paths={ key.paths } width={ key.width } height={ key.height } /> )
        })}
        <div className="keyWrap keysUpDownWrap">
          <div className="keysUpDown">
            <Key className="arrow up" paths={ keys[76].paths } width={ keys[76].width } height={ keys[76].height } />
            <Key className="arrow down" paths={ keys[77].paths } width={ keys[77].width } height={ keys[77].height } />
          </div>
        </div>
        <Key paths={ keys[78].paths } width={ keys[78].width } height={ keys[78].height } />
      </KeyboardWithStyle>
    )
  }
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'

const KeyboardWithStyle = styled.div`
  background: #b5b8c0;
  padding-bottom: 8px;
  width: 892.469px;
  border-radius: 12px;
  box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.4), 5px 5px 10px 0px rgba(0,0,0,0.4);
  overflow: auto;


  .keyWrap { display: inline-block; }
  .keysUpDownWrap {
    float: left;
    .keysUpDown {
      display: flex;
      flex-direction: column;
      padding-top: 8px;
      padding-left: 8px;
      > div {
        margin: 0px;
        &:first-child {
          &:before {
            content: '';
            position: absolute;
            top: calc( 100% - 4px );
            right: 0;
            width: 100%;
            height: 8px;
            background-color: #444;
          }
        }
      }
    }
  }
`
