import React, { Component } from 'react'
import { Segment, Header, Divider, Rating } from 'semantic-ui-react'
const MovieRating = (props) => {
  return (
    <>
      <Rating size="huge" icon="star"style={{color:"white"}}defaultRating={0} maxRating={5} />
      </>
  )
}


export default MovieRating