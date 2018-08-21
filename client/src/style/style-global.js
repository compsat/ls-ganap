import { injectGlobal } from 'styled-components';
import theme from './style-theme';
import { interpolate } from './style-utils';

injectGlobal`
  @font-face {
    font-family: 'Calluna';
    src: url('Calluna-Black.eot');
    src: local('Calluna-Black'),
        url('Calluna-Black.eot?#iefix') format('embedded-opentype'),
        url(${require('../assets/fonts/Calluna-Black.woff2')}) format('woff2'),
        url(${require('../assets/fonts/Calluna-Black.woff')}) format('woff'),
        url(${require('../assets/fonts/Calluna-Black.ttf')}) format('truetype');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Quatro Sans';
    src: url('QuatroSans-SemiBold.eot');
    src: local('QuatroSans-SemiBold'),
        url('QuatroSans-SemiBold.eot?#iefix') format('embedded-opentype'),
        url(${require('../assets/fonts/QuatroSans-SemiBold.woff2')}) format('woff2'),
        url(${require('../assets/fonts/QuatroSans-SemiBold.woff')}) format('woff'),
        url(${require('../assets/fonts/QuatroSans-SemiBold.ttf')}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Nirmala UI';
    src: url('NirmalaUI.eot');
    src: local('Nirmala UI'), local('NirmalaUI'),
        url('NirmalaUI.eot?#iefix') format('embedded-opentype'),
        url(${require('../assets/fonts/NirmalaUI.woff2')}) format('woff2'),
        url(${require('../assets/fonts/NirmalaUI.woff')}) format('woff'),
        url(${require('../assets/fonts/NirmalaUI.ttf')}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html,
  body {
    height: 100%;
    overflow-x: hidden;
    background-color: #F9F9F9;
  }

  body {
    min-height: 100%;
    font-family: 'Nirmala UI';
  }

  #root {
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;
  }

  html {
    ${interpolate('font-size',
        theme.sizes.minSiteWidth, theme.sizes.maxSiteWidth,
        theme.type.minFontSize, theme.type.maxFontSize)}
  }
`;
