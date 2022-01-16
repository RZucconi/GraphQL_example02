import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams, Link } from 'react-router-dom'

import fetchSong from '../queries/fetchSong'
import LyricCreate from './LyricCreate'
import LyricList from './LyricList'

export default function SongDetail() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(fetchSong, { variables: { id } })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div>
      <Link to='/'>Back</Link>
      <h3>{data.song.title}</h3>
      <LyricList lyrics={data.song.lyrics}/>
      <LyricCreate songId={data.song.id}/>
    </div>
  )
}