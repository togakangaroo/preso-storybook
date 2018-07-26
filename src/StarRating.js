import React from 'react'
import styled from 'styled-components'

const repeat = times => fn => Array(times).fill(0).map(fn)
const isNonZeroFalsy = v => !v && v !== 0
const noop = () => {}

const Star = styled(({className, onClick}) => (
    <div className={className} onClick={onClick}>★</div>
))`
    font-size: 50px;
`
const UnselectedStar = styled(Star)`
    color: gold;
`
const SelectedStar = styled(Star)`
    color: green;
`
const InactiveStar = styled(Star)`
    color: gray;
`

const getStar = (value, starValue, onClick) => React.createElement(
    isNonZeroFalsy(value) ? InactiveStar :
    (starValue <= value)  ? SelectedStar
                          : UnselectedStar,
    {key: `star${starValue}`, onClick: event => onClick({starValue, event})}
)

export const StarRating = styled(({starCount=5, value=5, className, onClick=noop}) => (
    <div className={className}>
        <input type="range" min="0" max={starCount} step="1" value={isNonZeroFalsy(value) ? '' : value} />
        <React.Fragment>
            {repeat(starCount)((_, i) => getStar(value, i+1, onClick))}
        </React.Fragment>
    </div>
))`
    display: inline-flex;
    & > input {
      display: none;
    }
`

export default StarRating
