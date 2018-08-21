import { css } from 'styled-components';
import theme from './style-theme';

export const media = Object.keys(theme.breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media screen and (min-width: ${theme.breakpoints[label]}) {
            ${css(...args)}
        }
    `

    return acc;
}, {});

export const interpolate = (property, minScreen, maxScreen, minValue, maxValue) => {
    return `
        ${property}: ${minValue};

        @media screen and (min-width: ${minScreen}) {
            ${property}: ${calcInterpolation(minScreen, minValue, maxScreen, maxValue)};
        }

        @media screen and (min-width: ${maxScreen}) {
            ${property}: ${maxValue};
        }
    `;
}

export const calcInterpolation = (minScreen, minValue, maxScreen, maxValue) => {
    minScreen = parseInt(minScreen, 10);
    minValue = parseInt(minValue, 10);
    maxScreen = parseInt(maxScreen, 10);
    maxValue = parseInt(maxValue, 10);

    const a = (maxValue - minValue)/(maxScreen - minScreen);
    let b = minValue - a * minScreen;

    let sign = '+';

    if (b < 0) {
        sign = '-';
        b = Math.abs(b);
    }

    return `calc(${a*100}vw ${sign} ${b}px)`;
}

export const modularScale = (multiple) => `${theme.type.typeScale**multiple}em`;
