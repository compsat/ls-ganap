import { injectGlobal } from 'styled-components';
import theme from './style-theme';
import { interpolate } from './style-utils';

injectGlobal`
  html,
  body {
    overflow-x: hidden;
  }

  body {
    ${interpolate('font-size',
        theme.sizes.minSiteWidth, theme.sizes.maxSiteWidth,
        theme.type.minFontSize, theme.type.maxFontSize)}
  }
`;
