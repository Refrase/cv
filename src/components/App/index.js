// Packages
import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
// Utils
import { getURLParams } from 'utils/scripts/params'
import { titleCase } from 'utils/scripts/string'
// Components
import LayoutWrap from 'components/LayoutWrap'
import Radio from 'components/Radio'
import ButtonRound from 'components/ButtonRound'
import Cv from 'components/Cv'
import PostIt from 'components/PostIt'
import Keyboard from 'components/Keyboard'
// Assets
import fifaDisc from 'assets/images/fifa98_disc.svg'

export default class App extends Component {
  constructor(props) {

    super(props)

    this.sealDestiny = this.sealDestiny.bind(this)
    this.toggleRadioOn = this.toggleRadioOn.bind(this)
    this.previousSong = this.previousSong.bind(this)
    this.nextSong = this.nextSong.bind(this)
    this.getIndexOfSongPlaying = this.getIndexOfSongPlaying.bind(this)

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
          { employer: 'Danish School of Media', position: 'Advisory Board Member, Graphic Design' },
          { employer: 'Politiken', position: 'Digital Newsgraphics Developer' },
          { employer: 'FC Nordsjælland', position: 'Graphic Designer' }
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
      buttonWords: [ 'Seal', 'destiny', '<span class="icon">&#128591;</span>' ],
      discEjected: false,
      employers: [ 'Google', 'Lego', "McDonald's", 'Apple', 'Type16', '7-Eleven', 'The Police', 'State Ministry', 'NASA', 'Denmark', 'Earth', 'FBI', 'Hogwarts', 'Tivoli', 'Zoo', 'Mordor', 'Chelsea FC', 'The Killers' ],
      positions: [ 'CEO', 'CTO', 'Full-Stack Developer', 'Maid', 'Whistle Blower', 'Runner', 'Stunner', 'Water Boy', 'Pixel Pusher', 'Moon Shooter', 'Hacker', 'Slacker', 'Guitarist', 'Creative Technologist', 'Sorcerer', 'Attacking Midfielder', 'Parrot Breeder', 'Lead Singer', 'Backing Vocalist', 'Front Runner', 'Front-End Developer' ],
      radioOn: false,
      songPlaying: null,
      indexOfSongPlaying: null,
      songs: [
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
      ],
      screenLightLevel: 1
    }

  }

  componentDidMount() {
    this.setState({ songPlaying: this.state.songs[0] })
  }

  sealDestiny() {
    const employerRandom = this.state.employers[Math.floor(Math.random()*this.state.employers.length)]
    const positionRandom = this.state.positions[Math.floor(Math.random()*this.state.positions.length)]

    const params = getURLParams()
    const employer =
      this.state.jobChanges === 3 && params && params.position && params.employer ? titleCase(params.employer) : this.state.jobChanges === 3 ? 'Google' : employerRandom
    const position =
      this.state.jobChanges === 3 && params && params.position && params.employer ? titleCase(params.position) : this.state.jobChanges === 3 ? 'CTO' : positionRandom

    let previous = this.state.jobs.previous.slice()
    previous.unshift(this.state.jobs.current)

    const current = { ...this.state.jobs.current, employer, position }

    const jobs = { ...this.state.jobs, current, previous }
    const jobChanges = this.state.jobChanges + 1

    this.setState({
      jobs,
      jobChanges,
      jobChanged: true,
      buttonWords: [ 'Seal', 'destiny', 'again' ]
    })
  }

  toggleRadioOn() {
    this.setState({ radioOn: !this.state.radioOn })
  }

  getIndexOfSongPlaying() {
    const indexOfSongPlaying = this.state.songs.map( (song, index) => { if ( song.title === this.state.songPlaying.title ) return index }).filter(isFinite)[0]
    this.setState({ indexOfSongPlaying })
  }

  async nextSong() {
    if ( !this.state.radioOn ) return
    await this.getIndexOfSongPlaying()
    const indexOfNextSong = this.state.indexOfSongPlaying + 1 === this.state.songs.length ? 0 : this.state.indexOfSongPlaying + 1
    this.setState({ songPlaying: this.state.songs[indexOfNextSong] })
  }

  async previousSong() {
    if ( !this.state.radioOn ) return
    await this.getIndexOfSongPlaying()
    const indexOfPreviousSong = this.state.indexOfSongPlaying - 1 === -1 ? this.state.songs.length - 1 : this.state.indexOfSongPlaying - 1
    this.setState({ songPlaying: this.state.songs[indexOfPreviousSong] })
  }

  turnScreenLightUp() { this.state.screenLightLevel < 0.95 ? this.setState({ screenLightLevel: parseFloat((this.state.screenLightLevel + 0.1).toFixed(1)) }) : this.setState({ screenLightLevel: 1 }) }
  turnScreenLightDown() { this.state.screenLightLevel > 0.05 ? this.setState({ screenLightLevel: parseFloat((this.state.screenLightLevel - 0.1).toFixed(1)) }) : this.setState({ screenLightLevel: 0 }) }

  render() {
    return (
      <Scrollbars style={{ opacity: this.state.screenLightLevel }}>

        <Background />

        <LayoutWrap degrees={ 2 } draggable
          top='80px'
          topResponsive={{ wideDown: '80px', mediumDown: '200px' }}
          right='5vw'
          rightResponsive={{ wideDown: '5vw', mediumDown: '5vw', narrowDown: '0' }}>
          <Cv
            meta={ this.state.meta }
            jobs={ this.state.jobs }
            links={ this.state.links }
            educations={ this.state.educations }
            jobChanged={ this.state.jobChanged } />
        </LayoutWrap>

        <LayoutWrap degrees={ -16 } zIndex={ 90 } draggable
          top='32px'
          topResponsive={{ wideDown: '32px', mediumDown: '200px' }}
          right='calc( 5vw + 220px )'
          rightResponsive={{ wideDown: 'calc( 5vw + 220px )', mediumDown: 'calc( 5vw + 220px )', narrowDown: '200px' }}>
          <ButtonRound words={ this.state.buttonWords } onClick={ () => this.sealDestiny() } />
        </LayoutWrap>

        <FifaDiscWrap className={ this.state.discEjected ? 'ejected' : '' }>
          <img draggable="false" src={ fifaDisc } alt="FIFA98 disc"/>
        </FifaDiscWrap>

        <LayoutWrap degrees={ -2 } top='304px' right='35vw' draggable
          topResponsive={{ wideDown: '600px', mediumDown: '650px', narrowDown: '900px' }}
          rightResponsive={{ wideDown: '370px', mediumDown: '370px', narrowDown: '20px' }}>
          <Keyboard
            onFastBackwards={ this.previousSong }
            onPlay={ () => this.setState({ radioOn: !this.state.radioOn }) }
            onFastForward={ this.nextSong }
            onEject={ () => this.setState({ discEjected: !this.state.discEjected }) }
            onLightDown={ this.turnScreenLightDown.bind(this) }
            onLightUp={ this.turnScreenLightUp.bind(this) } />
        </LayoutWrap>

        <LayoutWrap degrees={ -12 } zIndex={ 100 } draggable
          top='128px'
          topResponsive={{ wideDown: '128px', mediumDown: '64px' }}
          left='3vw'
          leftResponsive={{ wideDown: '10vw', mediumDown: '10vw', narrowDown: 'auto' }}
          rightResponsive={{ wideDown: 'auto', mediumDown: 'auto', narrowDown: '25px' }}>
          <Radio
            on={ this.state.radioOn }
            toggleOn={ this.toggleRadioOn }
            nextSong={ this.nextSong }
            songPlaying={ this.state.songPlaying } />
        </LayoutWrap>

        <LayoutWrap degrees={ -20 } top='-4px' right='35vw' draggable
          topResponsive={{ wideDown: '230px', mediumDown: '250px', narrowDown: '1300px' }}
          rightResponsive={{ wideDown: '480px', mediumDown: '420px', narrowDown: '80px' }}>
          <PostIt text="Start using Wunderlist instead of these fucking post-its" />
        </LayoutWrap>

        <LayoutWrap degrees={ 11 } top='110px' right='40vw' draggable
          topResponsive={{ wideDown: '334px', mediumDown: '390px', narrowDown: '1440px' }}
          rightResponsive={{ wideDown: '610px', mediumDown: '420px', narrowDown: '80px' }}>
          <PostIt text="Create non-boring CV for job applications" />
        </LayoutWrap>

      </Scrollbars>
    )
  }
}

// ----- STYLING ----- //
// Packages
import styled, { injectGlobal } from 'styled-components'
import { transparentize } from 'polished'
import { generateMedia } from 'styled-media-query'
// Assets
import noiseTile from 'assets/images/noisetile-800-100-4-monochrome.png' // http://noisepng.com/
import woodTexture from 'assets/images/wood-texture.jpeg'
// Utils
import { colors, fonts } from 'utils/styles/vars'
import { scaler } from 'utils/styles/helpers'
import { fadeIn, slideDownIntoView, fallDown } from 'utils/styles/animations'
import { breakpoints } from 'utils/scripts/breakpoints'

const customMediaQueries = generateMedia(breakpoints)

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
    background: black;
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
    #ffa54f; /* Wood. Alts: #da6d42, #563232 */

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: -20vw;
    width: 140vw;
    height: 200vh;
    opacity: 0.05;
    background: url( ${ woodTexture } );
    background-size: 800px;
  }

  &:after {
    content: '';
    position: fixed;
    top: -30vh;
    left: -20vw;
    width: 140vw;
    height: 120vh;
    background:
      url(${ noiseTile }),
      linear-gradient(to top, ${colors.base.darker[4]}, ${colors.base.darker[5]} );
    box-shadow: 0px 10px 80px 0px ${colors.base.darker[12]};
    transform: rotate(-3deg);
    border-bottom: 6px solid ${colors.base.darker[6]};
    backface-visibility: hidden; { /* Smoothing edges on transform-rotated elements in WebKit */ }
  }

  ${ customMediaQueries.lessThan( 'wide' )`
    background: none;
    &:after { box-shadow: none; top: 0; transform: rotate(0deg); }
  `}
`
const FifaDiscWrap = styled.div`
  position: fixed;
  width: 320px;
  z-index: 10000;
  top: 0;
  left: 50vw;
  border-radius: 50%;
  box-shadow: 0px 0px 100px 10px rgba(0,0,0,0.75);
  transform: translate3d(-50%, -200%, 0) rotate(0deg);
  transition: transform 600ms cubic-bezier(0.4,0.75,0.6,1);

  &.ejected { transform: translate3d(-50%, -50%, 0) rotate(3450deg); }

  img { width: 100%; }
`
