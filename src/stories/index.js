import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import StarRating from '../StarRating.js'

storiesOf(`Star System`, module)
    .addDecorator(withKnobs)
    .add(`Star rating`, () => (
        <StarRating />
    ))
