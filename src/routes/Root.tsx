import React from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import './Root.css'

export const Root: React.FC = () => {
  return (
    <div className="app-container">
      <div className="hero-card">
        <h1 className="title">🚀 Welcome to Rick & Morty Explorer!</h1>
        <p className="subtitle">Dive into the multiverse and discover your favorite characters.</p>

        <Link to="/characters" className="btn-primary">
         Click here to Get Characters List
        </Link>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
