// Packages
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ButtonRound extends Component {
  render() {
    const { onClick, words } = this.props
    return(
      <ButtonRoundWithStyle onClick={ onClick }>
        <div className="inner">
          { words ? words.map( (word, index) => {
            return( <span key={ index } dangerouslySetInnerHTML={ { __html: word } } /> )
          }) : null }
        </div>
      </ButtonRoundWithStyle>
    )
  }
}

ButtonRound.propTypes = {
  onClick: PropTypes.func,
  words: PropTypes.array
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'
// Utils
import { colors, fonts, transitions } from 'utils/styles/vars'
import { scaler } from 'utils/styles/helpers'

const ButtonRoundWithStyle = styled.button`
  position: relative;
  border-radius: 50%;
  padding: ${scaler(2)};
  width: 150px;
  height: 150px;
  min-width: 150px;
  min-height: 150px;
  background: radial-gradient( ${colors.base.lighter[10]} 56%, white 64%, ${colors.base.default} );
  box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.4), 15px 15px 30px 0px rgba(0,0,0,0.3);

  &:focus { outline: 0; }

  .inner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    min-width: 100%;
    min-height: 100%;
    font-size: ${fonts.sizes.large};
    font-family: ${fonts.families.sans};
    font-weight: 600;
    letter-spacing: 0.5px;
    background-color: ${colors.alert.default};
    border: 1px solid ${colors.alert.darker[1]};
    color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 0px 5px ${colors.alert.darker[8]};
    transition: ${transitions.buttonHover.up};

    span {
      position: relative;
      top: -3px;
    }

    .icon { top: 3px; }

    &:hover {
      background-color: ${colors.alert.lighter[0]};
      border-color: ${colors.alert.lighter[0]};
      transform: scale(1.02);
      box-shadow: 0px 0px 0px 4px ${colors.alert.darker[8]};
    }

    &:active {
      transition: ${transitions.buttonHover.down};
      transform: scale(0.98);
      box-shadow: 0px 0px 0px 5px ${colors.alert.darker[8]};
    }
  }
`
