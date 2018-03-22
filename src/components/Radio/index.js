// Packages
import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { pause, powerOff, stepForward } from '@fortawesome/fontawesome-free-solid'
// Utils
import { currentTime } from 'utils/scripts/time'
// Components
import Button from 'components/Button'


export default class Radio extends Component {
  constructor(props) {
    super(props)

    this.decideIfDisplayLinesShouldAnimate = this.decideIfDisplayLinesShouldAnimate.bind(this)
    this.nextSong = this.nextSong.bind(this)
    this.toggleOn = this.toggleOn.bind(this)

    this.innerDisplay = null
    this.innerDisplayWidth = null
    this.updatedTime = null
    this.songs = [
      { title: 'Telegraph Road', artist: 'Dire Straits', release: 'Love Over Gold' },
      { title: 'Nothing to Find', artist: 'The War on Drugs', release: 'A Deeper Understanding' },
      { title: 'Suburbia', artist: 'Spleen United', release: 'Neanderthal' },
      { title: 'Scenes From an Italian Restaurant', artist: 'Billy Joel', release: 'The Stranger' },
      { title: 'When You Were Young', artist: 'The Killers', release: "Sam's Town" },
      { title: 'Map of the Problematique', artist: 'Muse', release: 'Black Holes and Revelations' },
      { title: 'Holy Mountains', artist: 'System of a Down', release: 'Hypnotize' },
      { title: 'Glory', artist: 'Dizzy Mizz Lizzy', release: 'Dizzy Mizz Lizzy' },
      { title: 'Rosanna', artist: 'Toto', release: 'Toto IV' },
      { title: 'Sleeping My Day Away', artist: 'D-A-D', release: 'No Fuel Left for the Pilgrims' },
      { title: "Takin' It To the Streets", artist: 'The Doobie Brothers', release: "Takin' It To the Streets" },
      { title: 'Kalifornia', artist: 'Kashmir', release: 'No Balance Palace' },
      { title: 'Master of Puppets', artist: 'Metallica', release: 'Master of Puppets' },
      { title: 'New Slang', artist: 'The Shins', release: 'Oh, Inverted World' },
      { title: 'Abrasive', artist: 'Ratatat', release: 'Magnifique' },
      { title: 'Knights of Cydonia', artist: 'Muse', release: 'Black Holes and Revelations' },
      { title: 'Gold Ring', artist: 'Spleen United', release: 'Godspeed Into The Mainstream' },
      { title: 'Something Happened on the Way To Heaven', artist: 'Phil Collins', release: '...But Seriously' },
      { title: 'Hide and Seek', artist: 'Imogen Heap', release: 'Speak For Yourself' },
      { title: 'Beyond', artist: 'Daft Punk', release: 'Random Access Memories' },
      { title: 'Dom sa!', artist: 'Veronica Maggio', release: 'Den Förste Är Alltid Gratis' },
      { title: 'Shooting Up Sunshine', artist: 'Reptile Youth', release: 'Reptile Youth' },
      { title: 'We Are Not Your Friends', artist: 'Veto', release: "There's A Beat In All Machines" },
      { title: 'Question!', artist: 'System of a Down', release: 'Mezmerize' },
      { title: '8(circle)', artist: 'Bon Iver', release: '22, A Million' },
      { title: 'Mockingbird', artist: 'Eminem', release: 'Encore' }
    ]

    this.state = {
      lineLengths: [],
      songPlaying: this.songs[0],
      on: false,
      currentTime: currentTime()
    }
  }

  componentDidMount() {
    this.innerDisplayWidth = this.innerDisplay.clientWidth
    this.decideIfDisplayLinesShouldAnimate()
    this.updatedTime = setInterval( () => { this.setState({ currentTime: currentTime() }) }, 1000 )
  }

  componentWillUnmount() {
    clearInterval( this.updatedTime )
  }

  // Determines if each display line is longer than the inner display - and turns on animation for that line if it is
  decideIfDisplayLinesShouldAnimate() {
    const displayLines = document.getElementsByClassName( 'display_line' )

    for ( let displayLine of displayLines ) displayLine.classList.remove( 'display_line-animate' ) // Restarting any animation

    let lineLengths = []
    if ( displayLines.length ) {
      for ( let displayLine of displayLines ) {
        lineLengths.push(displayLine.clientWidth)
        if ( displayLine.clientWidth > this.innerDisplay.clientWidth - 16 ) displayLine.classList.add( 'display_line-animate' )
        else displayLine.classList.remove( 'display_line-animate' ) }}
    this.setState({ lineLengths })
  }

  nextSong() {
    if ( !this.state.on ) return
    const indexOfCurrentSong = this.songs.map( (song, index) => { if ( song.title === this.state.songPlaying.title ) return index }).filter(isFinite)[0]
    const indexOfNextSong = indexOfCurrentSong + 1 === this.songs.length ? 0 : indexOfCurrentSong + 1
    this.setState(
      { songPlaying: this.songs[indexOfNextSong] },
      () => this.decideIfDisplayLinesShouldAnimate() )
  }

  toggleOn() {
    this.setState(
      { on: !this.state.on },
      () => this.decideIfDisplayLinesShouldAnimate() )
  }

  render() {
    // Calculate the length of each line relative to inner display width, so that animation can be adjusted with durations (%) that make each line flow smoothly
    // 60 as the animation 'pauses' at 60% (see keyframes below)
    const displayToLineRatios = []
    for ( let i = 0; i < this.state.lineLengths.length; i++ ) displayToLineRatios.push(60 - (60 / (1 + this.state.lineLengths[i] / this.innerDisplayWidth)))

    const { ...songPlaying } = this.state.songPlaying

    return(
      <RadioWithStyle
        lineLengths={ this.state.lineLengths }
        innerDisplayWidth={ this.innerDisplayWidth }
        displayToLineRatios={ displayToLineRatios }>
        <div className="display">
          <div className="display_inner" ref={ (innerDisplay) => this.innerDisplay = innerDisplay }>
            { this.state.on ? (
              <div>
                <p className="display_line">{ songPlaying.title }</p>
                <p className="display_line">{ songPlaying.artist } &ndash; { songPlaying.release }</p>
              </div>
            ) : (
              <div>
                <p className="display_line">Standby</p>
                <p className="display_line">{ this.state.currentTime }</p>
              </div>
            ) }
          </div>
        </div>
        <Buttons>
          <FontAwesomeIcon icon="power-off" size="lg" onClick={ this.toggleOn } />
          <FontAwesomeIcon icon="step-forward" size="lg" onClick={ this.nextSong } />
        </Buttons>
        <div className="antenna">
          <div className="antenna_bottom">
            <div className="antenna_bottom_inner" />
          </div>
          <div className="antenna_rod"></div>
          <div className="antenna_top">
            <div className="antenna_top_inner" />
          </div>
        </div>
      </RadioWithStyle>
    )
  }
}

// ----- STYLING ----- //
// Packages
import styled, { keyframes } from 'styled-components'
import { transparentize } from 'polished'
// Utils
import { colors, fonts, transitions } from 'utils/styles/vars'
import { scaler } from 'utils/styles/helpers'

const RadioWithStyle = styled.div`
  position: relative;
  width: 300px;
  height: 100px;
  background-color: ${colors.base.darker[2]};
  border-radius: ${scaler(1)};
  box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.4), 20px 20px 40px 0px rgba(0,0,0,0.4);

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: ${scaler(1)};
    background-color: ${colors.base.lighter[3]};
    backface-visibility: hidden; /* Smoothing edges on transform-rotated elements in WebKit */
  }

  &:before {
    top: 0;
    border-top-left-radius: ${scaler(1)};
    border-top-right-radius: ${scaler(1)};
  }

  &:after {
    bottom: 0;
    border-bottom-left-radius: ${scaler(1)};
    border-bottom-right-radius: ${scaler(1)};
  }

  .display {
    position: absolute;
    height: calc( 100% - ${scaler(4)} );
    top: ${scaler(2)};
    width: 60%;
    left: ${scaler(2)};
    background-color: ${colors.base.darker[8]};
    border-radius: ${scaler(0.5)};
    overflow: hidden;

    &:after { /* Highlight */
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
      min-width: 100%;
      color: ${colors.light.default};
      font-family: ${fonts.families.digital};
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
        &:first-child { animation: slideLeftThrough1 12s 2s linear infinite; }
        &:last-child  { animation: slideLeftThrough2 12s 2s linear infinite; }
      }
    }
  }

  .antenna {
    position: absolute;
    width: 20px;
    height: 20px;
    top: ${scaler(-3)};
    right: ${scaler(-2)};

    &_bottom {
      position: absolute;
      width: 7px;
      height: 7px;
      right: calc( 100% + 9px );
      top: calc( 100% + 20px );
      border-radius: 50%;
      background: linear-gradient(-35deg, ${colors.base.darker[10]}, white);

      &_inner {
        position: absolute;
        width: 5px;
        height: 5px;
        right: 1px;
        top: 1px;
        border-radius: 50%;
        background-color: ${colors.base.darker[6]};
      }
    }

    &_rod {
      position: absolute;
      width: 40px;
      height: 4px;
      right: calc( 100% - 18px );
      top: calc( 100% + 6px );
      background: linear-gradient( ${colors.base.darker[2]} 10%, ${colors.base.darker[4]} 40%, white );
      transform: rotateZ(123deg);
      border-radius: 4px;
    }

    &_top {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(-35deg, ${colors.base.darker[10]}, white);
      width: 100%;
      height: 100%;
      overflow: hidden;

      &_inner {
        position: absolute;
        width: calc( 100% - 2px);
        height: calc( 100% - 2px);
        left: 1px;
        top: 1px;
        border-radius: 50%;
        background: radial-gradient(white 5%, ${colors.light.darker[2]} 20%, ${colors.light.darker[14]});
      }
    }
  }

  @supports (-webkit-filter: blur()) or (filter: blur()) {
    .antenna_top_inner:before {
      content: '';
      display: block;
      border: 9px solid;
      border-color: ${colors.base.lighter[5]} white ${colors.base.darker[8]};
      border-radius: 50%;
      transform: rotate(-35deg);
      filter: blur(2px);
    }
  }
`

const Buttons = styled.div`
  position: absolute;
  bottom: ${scaler(3)};
  right: ${scaler(2)};
  padding-left: ${scaler(2)};
  width: 30%;
  display: flex;
  justify-content: flex-end;
  color: ${colors.light.default};

  svg {
    cursor: pointer;
    transition: ${transitions.buttonHover.up};
    &:hover { opacity: 0.8; }
    &:not(:last-child) { margin-right: ${scaler(1.5)}; }
  }
`
