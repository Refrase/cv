import styled, { keyframes } from 'styled-components';
import { scaler } from 'utils/styles/helpers';

export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`
export const slideIn = keyframes`
  from { transform: translateX( -10% ); }
  to   { transform: translateX( 0 ); }
`
export const slideDown = keyframes`
  from { transform: translateY( -100% ); }
  to   { transform: translateY( 0 ); }
`
export const fallDown = keyframes`
  0%   { transform: scale( 25 ); opacity: 0; }
  1%   { transform: scale( 25 ); opacity: 1; }
  100% { transform: scale( 1 ); opacity: 1; }
`
export const slideDownIntoView = (degrees) => keyframes`
  0%   { transform: translateY( -100vh ) rotate( ${JSON.parse(degrees)[0]}deg ); }
  100% { transform: translateY( 0 ) rotate( ${JSON.parse(degrees)[1]}deg ); }
`
