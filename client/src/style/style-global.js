import { injectGlobal } from 'styled-components';
import theme from './style-theme';
import { interpolate } from './style-utils';

import Calluna from '../assets/fonts/calluna.ttf';
import NirmalaBold from '../assets/fonts/nirmalab.TTF';
import Nirmala from '../assets/fonts/nirmala.TTF';
import Quatro from '../assets/fonts/quatro-sans-regular.woff';

injectGlobal`
  html,
  body {
    overflow-x: hidden;
    background-color: #F9F9F9;
  }

  body {
    padding-top: 6em;
  }

  @font-face {
    font-family: Calluna;
    src: url(${Calluna});
  }

  @font-face {
    font-family: Nirmala Bold;
    src: url(${NirmalaBold});
  } 
  
  @font-face {
    font-family: Nirmala;
    src: url(${Nirmala});
  }

  @font-face {
    font-family: Quatro;
    src: url(${Quatro});
  }

  body {
    ${interpolate('font-size',
        theme.sizes.minSiteWidth, theme.sizes.maxSiteWidth,
        theme.type.minFontSize, theme.type.maxFontSize)}
  }
`;
