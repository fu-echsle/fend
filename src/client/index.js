import { pickDestination } from './js/pickDestination';
import { findDestination } from './js/formDestination';

import './styles/base.scss';
import './media/logo.svg';
import './media/icon.ico';
import './media/icon-32.png';
import './media/icon-96.png';
import './media/icon-180.png';
import './media/like.svg';
import './media/comment.svg';
import './media/expand.svg';
import './media/collapse.svg';
import {toggleVisibility} from './js/helpers';
import {showPreviousSearches} from './js/showPreviousSearches';

/**
 * Set up some behaviour of the UI.
 */
const initialize = () => {
    const sectionStart = document.querySelector('#start');
    const sectionDestinations = document.querySelector('#destinations');
    const sectionImages = document.querySelector('#images');
    const sectionForecast = document.querySelector('#forecast');
    const sectionPrevious = document.querySelector('#previous');
    sectionStart.querySelector('h2:first-of-type').addEventListener('click', () => {
        toggleVisibility(sectionStart);
    });
    toggleVisibility(sectionStart, true);

    sectionDestinations.querySelector('h2:first-of-type').addEventListener('click', () => {
        toggleVisibility(sectionDestinations);
    });

    sectionImages.querySelector('h2:first-of-type').addEventListener('click', () => {
        toggleVisibility(sectionImages);
    });

    sectionForecast.querySelector('h2:first-of-type').addEventListener('click', () => {
        toggleVisibility(sectionForecast);
    });

    sectionPrevious.querySelector('h2:first-of-type').addEventListener('click', () => {
        toggleVisibility(sectionPrevious);
    });

    showPreviousSearches();
};

initialize();

export {
    pickDestination,
    findDestination
};