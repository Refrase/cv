// Packages
import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'
// Components
import CvItem from 'components/CvItem'

export default class Cv extends Component {
  render() {
    const { ...meta } = this.props.meta
    const { ...jobs } = this.props.jobs
    return (
      <Wrap>
        <div className="header">
          <img src={ meta.image } alt={ `Image of ${ meta.firstName }` } />
          <div className="name"><span>CV</span> { meta.firstName } { meta.lastName }</div>
        </div>
        <div className="content">
          <div className="category">Experience</div>
          <div className="listWrap listWrap-jobs">
            <ul className={ `jobs ${ this.props.jobChanged ? 'itemAdded' : '' }` }>
              <ReactCSSTransitionGroup transitionName="currentJob" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                <CvItem key={ Math.random() } primaryInfo={ jobs.current.employer } secondaryInfo={ jobs.current.position } highlight />
                { this.props.jobs.previous.slice(0,6).map( (job, i) => {
                  return( <CvItem key={ `${ job.employer + job.position + Math.random(i) }` } primaryInfo={ job.employer } secondaryInfo={ job.position } /> )
                })}
              </ReactCSSTransitionGroup>
            </ul>
          </div>
          <div className="category">Education</div>
          <div className="listWrap">
            <ul>
              { this.props.educations.slice().reverse().map( (education, index) => {
                return ( <CvItem key={ index } primaryInfo={ education.school } secondaryInfo={ education.course } tertiaryInfo={ education.degree } /> )
              })}
            </ul>
          </div>
          <div className="category">Links</div>
          <div className="listWrap">
            <ul className="links">
              { this.props.links.map( (link, index) => {
                return ( <a className="link" key={ index } href={ link.url } target="_blank">{ link.label }</a> )
              })}
            </ul>
          </div>
        </div>
      </Wrap>
    )
  }
}

CvItem.propTypes = {
  meta: PropTypes.object,
  jobs: PropTypes.object,
  education: PropTypes.array,
  links: PropTypes.array,
  jobChanged: PropTypes.bool
}

// ----- STYLING ----- //
// Packages
import styled from 'styled-components'
import { transparentize } from 'polished'
// Utils
import { colors, fonts, transitions } from 'utils/styles/vars'
import { scaler } from 'utils/styles/helpers'

const imageHeight = scaler(16);

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: ${scaler(32)};
  border-radius: ${scaler(1)};
  border-top-right-radius: ${scaler(2)};
  border-top-left-radius: ${scaler(2)};
  color: ${colors.base.default};
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.3);

  .currentJob-enter {
    transform: translateY( -100% );
    transition: transform 200ms ease-out;
  }

  .currentJob-enter.currentJob-enter-active {
    transform: translateY( 0 );
  }

  .header {
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-end;
    background-color: ${colors.complementary.darker[3]};
    border-top-left-radius: ${scaler(2)};
    border-top-right-radius: ${scaler(1)};

    img {
      min-width: ${imageHeight};
      height: ${imageHeight};
      border-top-left-radius: ${scaler(1)};
    }

    .name {
      margin-bottom: ${scaler(1.5)};
      margin-left: ${scaler(2)};
      font-weight: 600;
      font-family: ${fonts.families.sans};
      font-size: ${fonts.sizes.large};
      color: white;
      letter-spacing: 0.5px;
      white-space: pre-line;
      word-spacing: 320px;

      span {
        position: relative;
        white-space: nowrap;
        bottom: ${scaler(0.5)};
        word-spacing: 0;
        text-transform: uppercase;
        font-weight: 600;
        font-size: ${fonts.sizes.small};
        color: ${colors.complementary.darker[14]};
        backface-visibility: hidden; { /* Avoiding element being hidden during transition in WebKit */ }
      }
    }
  }

  .content {
    position: relative;
    width: 100%;
    padding-bottom: ${scaler(1)};

    .listWrap {  margin: 0;  }

    ul {
      list-style: none;
      padding-bottom: ${scaler(2)};
    }
  }

  .category {
    margin-bottom: ${scaler(1)};
    padding: ${scaler(0.5)} ${scaler(2)};
    font-size: ${fonts.sizes.xSmall};
    text-transform: uppercase;
    font-weight: 600;
    color: ${colors.complementary.darker[2]};
    background-color: ${colors.complementary.lighter[12]};
    letter-spacing: 1px;

    &:first-child { margin-bottom: ${scaler(0)}; }
  }

  .listWrap-jobs {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 64px;
      top: 0;
      left: 0;
      background-color: ${colors.complementary.lighter[16]};
      border-bottom: 1px dashed ${colors.complementary.lighter[10]};
    }

    &:after {
      content: 'Current job';
      position: absolute;
      right: 0px;
      top: -1px;
      transform: translateY(1px);
      color: ${colors.complementary.lighter[8]};
      background-color: inherit;
      border-bottom-left-radius: ${scaler(0.5)};
      padding: ${scaler(0.5)};
      text-transform: uppercase;
      font-size: ${fonts.sizes.xSmall};
      font-weight: 500;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
  }

  .jobs {
    position: relative;
    max-height: 244px;
    transition: max-height 200ms ease-out;
    overflow: hidden;

    &.itemAdded {
    max-height: 292px; {/* 5 jobs visible */}

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: ${scaler(2)};
        background: linear-gradient(to bottom, rgba(255,255,255,0), ${transparentize(0.9, colors.base.darker[0])} );
      }
    }
  }

  .links {
    padding: ${scaler(1)} ${scaler(2)};
    width: 100%;
    display: flex;
    justify-content: space-around;

    .link {
      position: relative;
      text-decoration: none;
      font-weight: 500;
      color: ${colors.base.default};
      z-index: 1;

      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8px;
        z-index: -1;
        transform: scaleY(0.25) translateY(3px);
        transform-origin: bottom;
        border-radius: ${scaler(0.25)};
        background-color: ${colors.signal.default};
        transition: all 100ms ease-out;
      }

      &:hover {
        &:before {
          background-color: ${colors.light.darker[0]};
          transform: scaleY(1) translateY(-1px);
        }
      }
    }
  }
`
