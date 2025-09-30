import React from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchCharacterById } from '../api.tsx'

export const CharacterDetails: React.FC = () => {
  const { id } = useParams({ from: '/characters/$id' })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
  })

  if (isLoading) {
    return <div style={{display:'flex',justifyContent:'center', padding: 20, fontSize: 18 }}>⏳ Loading character details...</div>
  }

  if (isError || !data) {
    return <div style={{ padding: 20, color: 'red' }}>❌ Failed to load character details.</div>
  }

  return (
    <div style={{ padding: 20, display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          maxWidth: 600,
          width: '100%',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: 24,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <img
            src={data.image}
            alt={data.name}
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '4px solid #eee',
              marginBottom: 16,
              objectFit: 'cover',
            }}
          />
          <h2 style={{ margin: 0, fontSize: 28, color:'grey' }}>{data.name}</h2>
          <span
            style={{
              display: 'inline-block',
              marginTop: 8,
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 'bold',
              background:
                data.status === 'Alive'
                  ? '#d4edda'
                  : data.status === 'Dead'
                  ? '#f8d7da'
                  : '#fff3cd',
              color:
                data.status === 'Alive'
                  ? '#155724'
                  : data.status === 'Dead'
                  ? '#721c24'
                  : '#856404',
            }}
          >
            {data.status}
          </span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 16, lineHeight: 1.8 }} className = "character-details">
          <li>
            <strong>Species:</strong> {data.species}
          </li>
          {data.type && (
            <li>
              <strong>Type:</strong> {data.type}
            </li>
          )}
          <li>
            <strong>Gender:</strong> {data.gender}
          </li>
          <li>
            <strong>Origin:</strong> {data.origin.name}
          </li>
          <li>
            <strong>Location:</strong> {data.location.name}
          </li>
          <li>
            <strong>Created:</strong> {new Date(data.created).toLocaleDateString()}
          </li>
        </ul>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link
            to="/characters"
            search={{ page: 1 }}
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              borderRadius: 8,
              textDecoration: 'none',
              background: '#007bff',
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            ← Back to list
          </Link>
        </div>
      </div>
    </div>
  )
}
