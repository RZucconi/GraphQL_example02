import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default function LyricCreate({ songId }) {
  const [ content, setContent ] = useState('')
  const [ addLyricToSong ] = useMutation(mutation)

  const onSubmit = (event) => {
    event.preventDefault()

    addLyricToSong({ variables: { content, songId } })
      .then(() => setContent(''))
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Add a Lyric</label>
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
    </form>
  )
}