import { injectGlobal } from 'styled-components';
import theme from './Theme';

injectGlobal`
  html,
  body {
    overflow-x: hidden;
  }

  body {
    font-size: ${theme.minFontSize};

    @media screen and (min-width: ${theme.minSiteWidth}) {
      font-size: calc(
        ${theme.minFontSize} +
          ${parseInt(theme.maxFontSize) - parseInt(theme.minFontSize)} *
            (100vw - ${theme.minSiteWidth})/
            (${parseInt(theme.maxSiteWidth) - parseInt(theme.minSiteWidth)})
      );
    }

    @media screen and (min-width: ${theme.maxSiteWidth}) {
      font-size: ${theme.maxFontSize};
    }
  }
`;
