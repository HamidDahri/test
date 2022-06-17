import React, { Fragment } from 'react'
import spinner from './spinner.gif'
export const Spinner = () => {
  return (
    <Fragment>
        <img src={spinner} alt='' style={{position: "fixed" ,
         alignItems:'center',
         alignContent: "center",
         width: "400px"
         , height: '400px'
        }}></img>
    </Fragment>
  )
}
