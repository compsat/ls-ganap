import { injectGlobal } from 'styled-components';
import theme from './style-theme';
import { interpolate } from './style-utils';

import Calluna from '../assets/fonts/calluna.ttf';
import NirmalaBold from '../assets/fonts/nirmalab.TTF';
import Nirmala from '../assets/fonts/nirmala.TTF';
import Quatro from '../assets/fonts/quatro-sans-regular.woff';

injectGlobal`
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
    min-height: 100%;
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
