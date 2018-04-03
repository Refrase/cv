// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Key extends Component {
  render() {
    const { className, width, height, children } = this.props
    const { ...paths } = this.props.paths

    const defaultWidth = 52.917
    const defaultHeight = 51.917

    return(
      <KeyWithStyle className={ className } width={ width ? width : defaultWidth } height={ height ? height : defaultHeight }>
        <div className="shadowAboveActive"></div>
        <div className="holeBelowExtension"></div>
        <svg className="key" xmlns="http://www.w3.org/2000/svg"
          width={ width ? width : defaultWidth }
          height={ height ? height : 51.917 }
          viewBox={ width || height ? `0 0 ${width ? width : defaultWidth} ${height ? height : defaultHeight}` : '0 0 52.917 51.917' }>
          <rect className="hole" x="0" y="0" width={ width ? width : defaultWidth } height={ height ? height : defaultHeight } rx="4" ry="4" />
          <g className={ `plasticAndPrint ${ width ? 'rectangular' : '' }` }>
            <rect className="plastic" x="1" y="1" width={ width ? width - 2 : defaultWidth - 2 } height={ height ? height - 2 : defaultHeight - 2 } rx="3" ry="3" />
            <path className="print" d={ paths.print } />
            { children }
          </g>
        </svg>
      </KeyWithStyle>
    )
  }
}

Key.propTypes = {
  className: PropTypes.string,
  paths: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.node
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'

const keyColor = '#f4f3f4';
const holeColor = '#444';
const borderRadius = '4px';

const KeyWithStyle = styled.div`
  display: inline-block;
  position: relative;
  float: left;
  cursor: pointer;
  margin-left: 8px;
  margin-top: 8px;

  &.enter {
    &:after {
      content: '';
      position: absolute;
      top: calc( 100% - 5px );
      right: 1px;
      width: 35.993px;
      height: 64.708px;
      background-color: ${keyColor};
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
      z-index: 3;
    }
    .holeBelowExtension {
      position: absolute;
      top: calc( 100% - 4px );
      right: 0;
      width: 37.993px;
      height: 64.708px;
      background-color: ${holeColor};
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }

  &.arrow {
    &:after {
      content: '';
      position: absolute;
      left: 1px;
      width: calc(100% - 2px);
      height: 6px;
      z-index: 3;
      transition: background 50ms ease-out;
    }
    &.up:after {
      background: linear-gradient( ${keyColor}, rgba(0,0,0,0.25) ), white;
      bottom: 0px;
    }
    &.down:after {
      background: linear-gradient( rgba(0,0,0,0.25), ${keyColor} ), white;
      top: 1px;
    }
  }

  .shadowAboveActive {
    position: absolute;
    width: ${ props => props.width - 2 }px;
    height: 4px;
    top: 1px;
    left: 1px;
    border-radius: 3px;
    transition: background 50ms ease-out;
    background: transparent;
    z-index: 2;
  }

  &:active {
    &.enter:after { transform: scale3d(0.985, 0.985, 1) translateY(-1px); }
    &.arrow {
      &:after { transform: scaleX(0.985); width: calc(100% - 3px); }
      &.up:after { background: linear-gradient( ${keyColor}, rgba(0,0,0,0.25) 75%, ${holeColor} ), white; }
      &.down:after { background: linear-gradient( ${holeColor}, rgba(0,0,0,0.25) 25%, ${keyColor} ), white; }
    }
    .plasticAndPrint { transform: scale3d(0.985, 0.985, 0);
      &.rectangular { transform: scale3d(0.991, 0.985, 1) !important; }
    }
    &.space .plasticAndPrint { transform: scale3d(0.996, 0.985, 0) !important; }
    .shadowAboveActive { background: linear-gradient( rgba(0,0,0,0.5), rgba(0,0,0,0.1) 50%, transparent ); }
  }

  .key {
    position: relative;
    z-index: 1;
    .hole { fill: ${holeColor}; }
    .plasticAndPrint {
      transition: transform 50ms linear;
      transform-origin: center center;
      .plastic { fill: ${keyColor}; }
      .print { fill: #666; }
    }
  }
`
