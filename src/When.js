import React      from 'react';
import spinnerUrl from './spinner.gif'

export const Spinner = () => (
    <aside className="spinner">
    <img src={spinnerUrl} alt="Please wait" />
    </aside>
)

export const When = ({value, render}) => {
  if(!value)
    return <Spinner />
  return render(value)
}

export default When
