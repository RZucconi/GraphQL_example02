import React from 'react'
import { gql, useMutation } from '@apollo/client'

import fetchSong from '../queries/fetchSong'

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id){
      content
      likes
      __typename
    }
  }
`

export default function LyricList({ lyrics }) {
  const [ likeLyric ] = useMutation(mutation, {
    refetchQueries: [
      fetchSong,
      'fetchSong'
    ]
  })

  const onLike = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  const renderLyrics = () => {
    return lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i
              className='material-icons right'
              onClick={() => onLike(id, likes)}
              >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      )
    })
  }

  return (
    <ul className='collection'>
      {renderLyrics()}
    </ul>
  )
}