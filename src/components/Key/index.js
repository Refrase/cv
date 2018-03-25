// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Key extends Component {
  render() {
    const { width, height } = this.props
    const { ...paths } = this.props.paths

    const defaultWidth = 52.917
    const defaultHeight = 51.917

    return(
      <KeyWithStyle width={ width ? width : defaultWidth } height={ height ? height : defaultHeight }>
        <div className="shadowAbove"></div>
        <svg className="key" xmlns="http://www.w3.org/2000/svg"
          width={ width ? width : defaultWidth }
          height={ height ? height : 51.917 }
          viewBox={ width || height ? `0 0 ${width ? width : defaultWidth} ${height ? height : defaultHeight}` : '0 0 52.917 51.917' }>
          <rect className="shadow" x="0" y="0" width={ width ? width : defaultWidth } height={ height ? height : defaultHeight } rx="4" ry="4" />
          <g className={ `plasticAndPrint ${ width ? 'rectangular' : '' }` }>
            <rect className="plastic" x="1" y="1" width={ width ? width - 2 : defaultWidth - 2 } height={ height ? height - 2 : defaultHeight - 2 } rx="3" ry="3" />
            <path className="print" d={ paths.print } />
          </g>
        </svg>
      </KeyWithStyle>
    )
  }
}

Key.propTypes = {
  paths: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'

const KeyWithStyle = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-left: 8px;
  margin-top: 8px;

  &:active {
    .plasticAndPrint {
      transform: scale3d(0.985, 0.985, 1);
      &.rectangular { transform: scale3d(0.991, 0.985, 1) !important; }
    }
    .shadowAbove { box-shadow: inset 0px 1px 2px rgba(0,0,0,0.25); }
  }

  .shadowAbove {
    position: absolute;
    width: ${ props => props.width - 2 }px;
    height: ${ props => props.height - 2 }px;
    top: 1px;
    left: 1px;
    border-radius: 3px;
    transition: box-shadow 50ms ease-out;
    background: radial-gradient( rgba(0,0,0,0.02) 60%, rgba(0,0,0,0) );
    box-shadow: inset 0px 0px 4px rgba(255,255,255,1);
  }

  .key {
    .shadow { fill: #444; }
    .plasticAndPrint {
      transition: transform 50ms linear;
      transform-origin: center center;
      .plastic { fill: #f4f3f4; }
      .print { fill: #666; }
    }
  }
`
