import React from 'react'

const repeat = times => fn => Array(5).fill(0).map(fn)

const Star = () => `★`

const StarRating = () => (
    React.createElement(`div`, ...repeat(5)(() => (
        <Star />
    )))
)

export default StarRating
