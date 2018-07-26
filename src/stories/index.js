import React from 'react';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import styled from 'styled-components'


const Ducky = styled(({type=`speak`}) => (
    <button>The Ducky will {type}</button>
))``

storiesOf('Ducky', module)
    .addDecorator(withKnobs)
    .add(`basic`, () => (
        <Ducky type={text(`Type Attribute`, `jump`)}/>
    ))
