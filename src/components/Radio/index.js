// Packages
import React, { Component } from 'react'
// components
import Button from 'components/Button'

export default class Radio extends Component {
  constructor(props) {
    super(props)

    this.decideIfDisplayLinesShouldAnimate = this.decideIfDisplayLinesShouldAnimate.bind(this)

    this.innerDisplay = null

    this.state = {
      innerDisplayWidth: null,
      lineLengths: []
    }
  }

  componentDidMount() {
    this.decideIfDisplayLinesShouldAnimate()
  }

  // Determines if each display line is longer than the inner display - and turns on animation for that line if it is
  decideIfDisplayLinesShouldAnimate() {
    const displayLines = document.getElementsByClassName( 'display_line' )
    let lineLengths = this.state.lineLengths
    if ( displayLines.length ) {
      for ( let displayLine of displayLines ) {
        lineLengths.push(displayLine.clientWidth)
        if ( displayLine.clientWidth > this.innerDisplay.clientWidth - 16 ) displayLine.classList.add( 'display_line-animate' )
      }
    }
    this.setState({
      innerDisplayWidth: this.innerDisplay.clientWidth,
      lineLengths
    })
  }

  render() {
    // Calculate the length of each line relative to inner display width, so that animation can be adjusted with durations (%) that make each line flow smoothly
    // 60 as the animation 'pauses' at 60% (see keyframes below)
    const displayToLineRatios = []
    for ( let i = 0; i < this.state.lineLengths.length; i++ ) displayToLineRatios.push(60 - (60 / (1 + this.state.lineLengths[i] / this.state.innerDisplayWidth)))

    return(
      <RadioWithStyle
        lineLengths={this.state.lineLengths}
        innerDisplayWidth={this.state.innerDisplayWidth}
        displayToLineRatios={displayToLineRatios}>
        <div className="display">
          <div className="display_inner" ref={(innerDisplay) => this.innerDisplay = innerDisplay}>
            <p className="display_line">Sultans of Swing</p>
            <p className="display_line">Dire Straits &ndash; The Very Best Of Dire Straits</p>
          </div>
        </div>
        <ButtonWrap>
          <Button label="Play" />
        </ButtonWrap>
        <div className="antenna" />
      </RadioWithStyle>
    )
  }
}

// ----- STYLING ----- //
// Packages
import styled, { keyframes } from 'styled-components'
import { transparentize } from 'polished'
// Utils
import { colors, fonts } from 'utils/vars'
import { scaler } from 'utils/helpers'

const RadioWithStyle = styled.div`
  position: relative;
  width: 300px;
  height: 100px;
  background-color: ${colors.base.darker[2]};
  border-radius: ${scaler(1)};
  overflow: hidden;
  box-shadow: 0px 10px 40px 0px rgba(0,0,0,0.4);

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: ${scaler(1)};
    background-color: ${colors.base.lighter[3]};
    backface-visibility: hidden; /* Smoothing edges on transform-rotated elements in WebKit */
  }
  &::before { top: 0; }
  &::after { bottom: 0; }

  .display {
    position: absolute;
    height: calc( 100% - ${scaler(4)} );
    top: ${scaler(2)};
    width: 60%;
    left: ${scaler(2)};
    background-color: ${colors.base.darker[8]};
    border-radius: ${scaler(0.5)};
    overflow: hidden;

    &::after { /* Highlight */
      content: '';
      position: absolute;
      display: block;
      top: -100px;
      right: -100px;
      width: 200px;
      height: 180px;
      background: linear-gradient(${transparentize(1, colors.light.default)}, ${transparentize(0.92, colors.light.default)});
      transform: rotate(45deg);
    }

    &_inner {
      position: absolute;
      height: calc(100% - ${scaler(2)});
      top: ${scaler(1)};
      width: calc(100% - ${scaler(2)});
      left: ${scaler(1)};
      background-color: ${colors.base.darker[4]};
      padding: ${scaler(0.5)} ${scaler(1)};
      overflow: hidden;
    }

    .display_line {
      display: inline-block;
      color: ${colors.light.default};
      font-family: 'VT323', monospace;
      font-size: ${fonts.sizes.xLarge};
      white-space: nowrap;

      &:not(:last-child) { margin-bottom: 2px; }

      @keyframes slideLeftThrough1 {
        0%                                                { transform: translate3d( 0, 0, 0 ); }
        ${props => props.displayToLineRatios[0]}%         { transform: translate3d( -${props => props.lineLengths[0] + 16}px, 0, 0 ); }
        ${props => props.displayToLineRatios[0] + 0.001}% { transform: translate3d( ${props => props.innerDisplayWidth}px, 0, 0 ); }
        60%                                               { transform: translate3d( 0, 0, 0 ); }
        100%                                              { transform: translate3d( 0, 0, 0 ); }
      }

      @keyframes slideLeftThrough2 {
        0%                                                { transform: translate3d( 0, 0, 0 ); }
        ${props => props.displayToLineRatios[1]}%         { transform: translate3d( -${props => props.lineLengths[1] + 16}px, 0, 0 ); }
        ${props => props.displayToLineRatios[1] + 0.001}% { transform: translate3d( ${props => props.innerDisplayWidth}px, 0, 0 ); }
        60%                                               { transform: translate3d( 0, 0, 0 ); }
        100%                                              { transform: translate3d( 0, 0, 0 ); }
      }

      &-animate {
        &:first-child  { animation: slideLeftThrough1 12s 2s linear infinite; }
        &:last-child { animation: slideLeftThrough2 12s 2s linear infinite; }
      }
    }
  }

  .antenna {
    position: absolute;
    width: 16px;
    height: 16px;
    top: ${scaler(2)};
    right: ${scaler(2)};
    border-radius: 50%;
    background: radial-gradient(white, ${colors.light.darker[6]} 20%, ${colors.base.lighter[10]});
  }
`

const ButtonWrap = styled.div`
  position: absolute;
  bottom: ${scaler(2)};
  right: ${scaler(2)};
`
