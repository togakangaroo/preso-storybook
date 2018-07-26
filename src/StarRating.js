import React from 'react'
import styled from 'styled-components'

const repeat = times => fn => Array(times).fill(0).map(fn)
const isNonZeroFalsy = v => !v && v !== 0

const Star = styled(({className}) => (
    <div className={className}>★</div>
))`
    font-size: 50px;
`
const renderStar = ({className}) => <Star className={className} />
const UnselectedStar = styled(renderStar)`
    color: gold;
`
const SelectedStar = styled(renderStar)`
    color: green;
`
const InactiveStar = styled(renderStar)`
    color: gray;
`

const getStar = (value, index) => React.createElement(
    isNonZeroFalsy(value) ? InactiveStar :
    (index < value)       ? SelectedStar
                          : UnselectedStar,
    {key: `star${index}`}
)

const StarRating = styled(({starCount=5, value=5, className}) => (
    <div className={className}>
        <input type="range" min="0" max={starCount} step="1" value={isNonZeroFalsy(value) ? '' : value} />
        <React.Fragment>
            {repeat(starCount)((_, i) => getStar(value, i))}
        </React.Fragment>
    </div>
))`
    display: inline-flex;
    & > input {
      display: none;
    }
`

export default StarRating
