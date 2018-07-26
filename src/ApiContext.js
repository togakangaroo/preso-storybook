import React from 'react'

const ApiContext = React.createContext()
export const ApiProvider = ApiContext.Provider

export const withApiContext = (Component) => (props) =>
    React.createElement(ApiContext.Consumer, null, (api) =>
        React.createElement(Component, {...props, api})
    )

export default ApiContext
