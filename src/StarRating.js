import React, {Component} from 'react'
import styled from 'styled-components'
import When from './When.js'
import {withApiContext} from './ApiContext.js'

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
        <input type="range" min="0" max={starCount} step="1" value={isNonZeroFalsy(value) ? '' : value} readOnly />
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

export const BareApiStarRating = class extends Component {
    render = () => (
        <When value={this.state && this.state.value} render={() => (
            <StarRating {...this.props} {...(this.state)} onClick={this.onClick} />
        )} />
    )
    onClick = (x) => {
        const {starId, api: {putStarRating}} = this.props
        this.props.onClick && this.props.onClick(x)
        putStarRating(starId, x.starValue)
    }
    componentDidUpdate = (prevProps) => {
        if(this.props.starId !== prevProps.starId)
            this.queryStarRating()
    }
    componentDidMount = () => this.queryStarRating()
    queryStarRating = () => {
        const {starId, api: {getStarRating}} = this.props
        getStarRating(starId).then(value => this.setState({value}))
    }
}

export const ApiStarRating = withApiContext(BareApiStarRating)

export default StarRating
