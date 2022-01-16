import React, { useState } from 'react'
import { gql, useMutation} from '@apollo/client'
import { Link, hashHistory, useNavigate } from 'react-router-dom'

import fetchSongs from '../queries/fetchSongs'

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`

export default function SongCreate() {
  const [ title, setTitle ] = useState('')
  const [ addSong, { data } ] = useMutation(mutation)
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()

    addSong({
      variables: {title: title },
      refetchQueries: [{ query: fetchSongs }]
    })
      .then(() => navigate('/'))
    }

  return (
    <div>
      <Link to='/'>Back</Link>
      <h3>Create a New Song:</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title:</label>
        <input 
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
      </form>
    </div>
  )
}