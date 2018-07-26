import React from 'react';

import { withKnobs, number, object } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {StarRating, ApiStarRating} from '../StarRating.js'
import {ApiContext} from '../ApiContext.js'

const wait = (ms, val) => new Promise((resolve) =>
    setTimeout(() => resolve(val), ms)
)
const toApiObject = (stubVals, apiDelay = 1000) => ({
    getStarRating: id => {
        action(`getStarRating`)(id, stubVals[id])
        return wait(apiDelay, stubVals[id])
    },
    putStarRating: (x) => {
        action(`putStarRating`)(x)
        return wait(apiDelay)
    }
})

const getApi = () => toApiObject(object(`Initial api store`, {
    123: 3,
    456: 1
}), number(`Api delay`, 1000))

storiesOf(`Star System`, module)
    .addDecorator(withKnobs)
    .add(`Star rating`, () => (
        <StarRating
            starCount={number(`Star Count`, 5)}
            value={number(`Value`, 3)}
            onClick={action(`Star click`)} />
    ))
    .add(`Api bound star rating`, () => (
        <ApiContext.Provider value={getApi()}>
            <ApiStarRating
                starId={number(`Star Id`, 123)}
                starCount={number(`Star Count`, 5)}
                onClick={action(`Star click`)} />
        </ApiContext.Provider>
    ))
