// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Components
import Key from 'components/Key'
// Data
import { keys } from 'data/keys'

export default class Keyboard extends Component {
  constructor(props) {
    super(props)
    this.state = { capsLock: false }
  }

  render() {
    return(
      <KeyboardWithStyle>
        { keys.slice(0, 1).map( ( key, index ) => {
          return ( <Key key={ index } paths={ key.paths } width={ key.width } height={ key.height } /> )
        })}
        <div className="keyWrap" onClick={ this.props.onLightDown }>
          <Key className="lightDown" paths={ keys[1].paths } width={ keys[1].width } height={ keys[1].height } />
        </div>
        <div className="keyWrap" onClick={ this.props.onLightUp }>
          <Key className="lightUp" paths={ keys[2].paths } width={ keys[2].width } height={ keys[2].height } />
        </div>
        { keys.slice(3, 7).map( ( key, index ) => {
          return ( <Key key={ index } paths={ key.paths } width={ key.width } height={ key.height } /> )
        })}
        <div className="keyWrap" onClick={ this.props.onFastBackwards }>
          <Key className="fastBackwards" paths={ keys[7].paths } width={ keys[7].width } height={ keys[7].height } />
        </div>
        <div className="keyWrap" onClick={ this.props.onPlay }>
          <Key className="play" paths={ keys[8].paths } width={ keys[8].width } height={ keys[8].height } />
        </div>
        <div className="keyWrap" onClick={ this.props.onFastForward }>
          <Key className="fastForward" paths={ keys[9].paths } width={ keys[9].width } height={ keys[9].height } />
        </div>
        { keys.slice(10, 13).map( ( key, index ) => {
          return ( <Key key={ index } paths={ key.paths } width={ key.width } height={ key.height } /> )
        })}
        <div className="keyWrap" onClick={ this.props.onEject }>
          <Key className="eject" paths={ keys[13].paths } width={ keys[13].width } height={ keys[13].height } />
        </div>
        { keys.slice(14, 41).map( ( key, index ) => {
          return ( <Key key={ index } paths={ key.paths } width={ key.width } height={ key.height } /> )
        })}
        <div className="keyWrap">
          <Key className="enter" paths={ keys[41].paths } width={ keys[41].width } height={ keys[41].height } />
        </div>
        <div className="keyWrap" onClick={ () => this.setState({ capsLock: !this.state.capsLock }) }>
          <Key paths={ keys[42].paths } width={ keys[42].width } height={ keys[42].height }>
            { this.state.capsLock ? (
              <g>
                <circle cx="10" cy="12" r="3" fill="#f4f3f4" />
                <circle cx="10" cy="12" r="2" fill="#1ef873" />
              </g>
            ) : null }
          </Key>
        </div>
        { keys.slice(43, 76).map( ( key, index ) => {
          return ( <Key key={ index } className={ index === 29 ? 'space' : '' } paths={ key.paths } width={ key.width } height={ key.height } /> )
        })}
        <div className="keyWrap">
          <div className="upDown">
            <Key className="arrow up" paths={ keys[76].paths } width={ keys[76].width } height={ keys[76].height } />
            <Key className="arrow down" paths={ keys[77].paths } width={ keys[77].width } height={ keys[77].height } />
          </div>
        </div>
        <Key paths={ keys[78].paths } width={ keys[78].width } height={ keys[78].height } />
      </KeyboardWithStyle>
    )
  }
}

Keyboard.propTypes = {
  onBackwards: PropTypes.func,
  onPlay: PropTypes.func,
  onFastForward: PropTypes.func,
  onEject: PropTypes.func,
  onLightDown: PropTypes.func,
  onLightUp: PropTypes.func
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

  .keyWrap {
    position: relative;
    float: left;
    display: inline-block;
  }

  .eject {
    &:after { /* Adding used look to eject button to call to action */
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d( -50%, -50%, 0 );
      width: 50%;
      height: 50%;
      z-index: 1;
      background: radial-gradient( rgba(255,255,255,0.85), transparent 70% );
    }
  }

  .upDown {
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
`
