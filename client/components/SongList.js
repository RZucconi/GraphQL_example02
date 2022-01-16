import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

import fetchSongs from '../queries/fetchSongs'

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`

export default function SongList() {
  const { loading, error, data } = useQuery(fetchSongs)
  const [ deleteSong ] = useMutation(mutation)

  const onSongDelete = (id) => {
    deleteSong({
      variables: { id },
      refetchQueries: [{ query: fetchSongs }]
    })
  }

  const renderSongs = () => {
    return data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i
            className='material-icons'
            onClick={() => onSongDelete(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div>
        <ul className='collection'>
          {renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className='btn-floating btn-large red right'
        >
          <i className='material-icons'>add</i>
        </Link>
    </div>
  )
}

