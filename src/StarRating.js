import React from 'react'

const repeat = times => fn => Array(times).fill(0).map(fn)

const Star = () => `★`

const StarRating = ({starCount = 5}) => (
    React.createElement(`div`, null, ...repeat(starCount)(() => (
        <Star />
    )))
)

export default StarRating
