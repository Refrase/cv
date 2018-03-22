// ----- SPACING ----- //
export const unit = 8

// ----- COLORS ----- //
import { darken, lighten } from 'polished'
export const colors = {
  base: { default: '#3e474f' },
  signal: { default: '#5fcf80' },
  complementary: { default: '#2976F2' },
  alert: { default: '#f21010' },
  light: { default: '#edeff0' }
}
// Adding color shades for each color
for ( var color in colors ) {
  colors[color].lighter = []
  colors[color].darker = []
  for ( let i = 1; i < 22; i++) colors[color].lighter.push( lighten(0.025 * i, colors[color].default) )
  for ( let i = 1; i < 22; i++) colors[color].darker.push( darken(0.025 * i, colors[color].default) )
}

// ----- TYPOGRAPHY ----- //
// font-size: 62.5%; is set as style on the html-tag (in App component) so that 1rem = 10px which means that eg. base: '1.4rem' equals 14px and so forth
export const fonts = {
  families: {
    sans: '"Nunito Sans", sans-serif',
    serif: '"Merriweather", serif',
    system: '"Work Sans", sans-serif',
    digital: '"VT323", monospace',
    hand: '"Caveat", cursive',
  },
  sizes: {
    xxSmall: '0.9rem',
    xSmall: '1rem',
    small: '1.2rem',
    base: '1.4rem',
    large: '1.6rem',
    xLarge: '2.0rem',
    xxLarge: '2.8rem'
  }
}

// ----- SHADOWS ----- //
export const shadows = {
  paper: '0px 0px 3px 1px rgba(0,0,0,0.3)',
}

// ----- TRANSITIONS ----- //
export const transitions = {
  buttonHover: {
    up: 'all 150ms ease-out',
    down: 'all 50ms ease-in'
  }
}
