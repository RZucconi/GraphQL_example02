import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import App from './components/App'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'

import './style/style.css'
import SongDetail from './components/SongDetail'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      songs: { keyFields: ["id"] },
      song: { keyFields: ["id"] },
      lyric: { keyFields: ["id"] }
    }
  })
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="songs/new" element={<SongCreate />}/>
        <Route path="songs/:id" element={<SongDetail />}/>
      </Routes>
      </HashRouter>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
