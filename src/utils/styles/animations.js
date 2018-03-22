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
export const slideOver = keyframes`
  0%   { transform: translateY( -100vh ) rotate( 10deg ); }
  100% { transform: translateY( 0 ) rotate( 2deg ); }
`
