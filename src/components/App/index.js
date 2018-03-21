// Packages
import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
// Components
import Radio from 'components/Radio'
import Button from 'components/Button'
import Cv from 'components/Cv'

export default class App extends Component {
  constructor(props) {

    super(props)

    this.sealDestiny = this.sealDestiny.bind(this)

    this.state = {
      meta: {
        firstName: 'Andreas',
        lastName: 'Reffstrup Rasmussen',
        image: 'https://type16.com/andreas-web.jpg',
        timeOfBirth: 628058100000,
        email: 'ar@type16.com'
      },
      jobs: {
        current: {
          employer: 'Type16',
          position: 'Product Designer, Developer &amp; Founder'
        },
        previous: [
          { employer: 'Zetland', position: 'UI Designer &amp; Frontend Developer' },
          { employer: 'Politiken', position: 'Newsgraphics Designer' },
          { employer: 'FC Nordsjælland', position: 'Graphic & Motion Designer' }
        ]
      },
      jobChanges: 3,
      jobChanged: false,
      educations: [
        { school: 'Danish School of Media', course: 'Visual Communication', degree: "Bachelor's Degree" },
        { school: 'IT University of Copenhagen', course: 'Digital Design & Communication', degree: "Masters's Degree" }
      ],
      links: [
        { label: 'Website', url: 'https://type16.com' },
        { label: 'GitHub', url: 'https://github.com/refrase' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/andreas-reffstrup-rasmussen-689b1060/' }
      ],
      buttonLabel: 'Seal destiny <span class="icon">&#128591;</span>'
    }

    this.employers = [ 'Google', 'Lego', "McDonald's", 'Apple', 'Type16', '7-Eleven', 'Shell', 'Netcompany', 'The Police', 'State Ministry', 'NASA', 'Denmark', 'Earth', 'FBI' ]
    this.positions = [ 'CEO', 'CTO', 'Full-Stack Developer', 'Cleaning Lady', 'Whistle Blower', 'Runner', 'Stunner', 'Water Boy', 'Pixel Pusher', 'Moon Shooter', 'Hacker', 'Agent' ]

  }

  sealDestiny(employer, position) {
    const employerRandom = this.employers[Math.floor(Math.random()*this.employers.length)]
    const positionRandom = this.positions[Math.floor(Math.random()*this.positions.length)]

    let previous = this.state.jobs.previous.slice()
    previous.unshift(this.state.jobs.current)

    const current = {
      ...this.state.jobs.current,
      employer: this.state.jobChanges > 3 ? employerRandom : employer,
      position: this.state.jobChanges > 3 ? positionRandom : position
    }

    const jobs = { ...this.state.jobs, current, previous }
    const jobChanges = this.state.jobChanges + 1

    this.setState({
      jobs,
      jobChanges,
      jobChanged: true,
      buttonLabel: 'Seal destiny again <span class="icon">&#128591;</span>'
    })
  }

  render() {
    return(
      <Scrollbars>
        <Background />
        <RadioWrap>
          <Radio />
        </RadioWrap>
        <ButtonWrap>
          <Button
            label={ this.state.buttonLabel }
            withIcon
            onClick={ () => this.sealDestiny( 'Netcompany', 'Ambitious Design-passionate Developer' ) } />
        </ButtonWrap>
        <CvWrap>
          <Cv
            meta={ this.state.meta }
            jobs={ this.state.jobs }
            links={ this.state.links }
            educations={ this.state.educations }
            jobChanged={ this.state.jobChanged }  />
        </CvWrap>
      </Scrollbars>
    )
  }
}

// ----- STYLING ----- //
// Packages
import styled, { injectGlobal } from 'styled-components'
import { transparentize } from 'polished'
// Assets
import noiseTile from 'assets/images/noisetile-800-100-4-monochrome.png' // http://noisepng.com/
import woodTexture from 'assets/images/wood-texture.jpeg'
// Utils
import { colors, fonts } from 'utils/vars'
import { scaler } from 'utils/helpers'
import { fadeIn, slideOver } from 'utils/animations'

const plankWidth = 240

injectGlobal`
  *, html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${fonts.families.system};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html {
    background: ${colors.base.darker[4]};
    font-size: 62.5%; /* Setting 1em to equal 10px */
  }
  body { font-size: 1.4rem; /* Equals 14px as font-size: 62.5% is set on html */ }
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: -10vw;
  width: 120vw;
  height: 200vh; /* Making it extend to the 'rubberband'-scroll area when scrolling before og past the length of the page */
  z-index: -1;
  background:
    repeating-linear-gradient(
      75.8deg, /* To follow lines in texture as good as possible */
      rgba(0,0,0,0.35) ${plankWidth * 1}px, rgba(0,0,0,0.35) ${plankWidth * 2}px,
      rgba(0,0,0,0.45) ${plankWidth * 2}px, rgba(0,0,0,0.45) ${plankWidth * 3}px,
      rgba(0,0,0,0.4) ${plankWidth * 3}px, rgba(0,0,0,0.4) ${plankWidth * 4}px,
      rgba(0,0,0,0.35) ${plankWidth * 4}px, rgba(0,0,0,0.35) ${plankWidth * 5}px,
      rgba(0,0,0,0.45) ${plankWidth * 5}px, rgba(0,0,0,0.45) ${plankWidth * 6}px,
      rgba(0,0,0,0.35) ${plankWidth * 6}px, rgba(0,0,0,0.35) ${plankWidth * 7}px,
      rgba(0,0,0,0.4) ${plankWidth * 7}px, rgba(0,0,0,0.4) ${plankWidth * 8}px,
      rgba(0,0,0,0.35) ${plankWidth * 8}px, rgba(0,0,0,0.35) ${plankWidth * 9}px,
      rgba(0,0,0,0.45) ${plankWidth * 9}px, rgba(0,0,0,0.45) ${plankWidth * 10}px
    ),
    #563232; /* Wood. Alt: #da6d42 */

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 200vh;
    opacity: 0.05;
    background: url( ${ woodTexture } );
    background-size: 800px;
  }

  &:after {
    content: '';
    position: fixed;
    top: -20vh;
    left: -20vw;
    width: 140vw;
    height: 100vh;
    background:
      url(${ noiseTile }),
      linear-gradient(to top, ${colors.base.darker[4]}, ${colors.base.darker[5]} );
    box-shadow: 0px 10px 80px 0px ${colors.base.darker[12]};
    transform: rotate(-3deg);
    border-bottom: 6px solid ${colors.base.darker[6]};
    backface-visibility: hidden; { /* Smoothing edges on transform-rotated elements in WebKit */ }
  }
`

const RadioWrap = styled.div`
  position: absolute;
  top: ${scaler(20)};
  left: ${scaler(20)};
  transform: rotate(-12deg);
`

const ButtonWrap = styled.div`
  position: absolute;
  top: ${scaler(2)};
  right: ${scaler(2)};
  opacity: 0;
  animation: ${fadeIn} 300ms 1200ms ease-out forwards;
`

const CvWrap = styled.div`
  position: absolute;
  display: block;
  right: 5vw;
  top: ${scaler(10)};
  backface-visibility: hidden; { /* Smoothing edges on transform-rotated elements in WebKit */ }
  transform: translateY( -100vh );
  animation: ${slideOver} 800ms cubic-bezier(0.4,0.75,0.6,1) forwards;
`
