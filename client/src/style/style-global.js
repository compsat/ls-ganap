import { injectGlobal } from 'styled-components';
import theme from './style-theme';
import { interpolate } from './style-utils';

import Calluna from '../assets/fonts/calluna.ttf';
import NirmalaBold from '../assets/fonts/nirmalab.TTF';
import Nirmala from '../assets/fonts/nirmala.TTF';
import FiraSans from '../assets/fonts/firasans-light.ttf';
import QuatroSemiBold from '../assets/fonts/quatro-sans-semibold.woff';
import Quatro from '../assets/fonts/quatro-sans-regular.woff';

injectGlobal`
  html,
  body {
    overflow-x: hidden;
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
    font-family: Fira Sans;
    src: url(${FiraSans});
  }

  @font-face {
    font-family: Quatro Semibold;
    src: url(${QuatroSemiBold});
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
