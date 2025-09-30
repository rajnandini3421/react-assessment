import React from 'react'
import { Router, Route, RootRoute,NotFoundRoute } from '@tanstack/react-router'
import { Root } from './routes/Root.tsx'
import { CharacterList } from './routes/CharacterList.tsx'
import { CharacterDetails } from './routes/CharacterDetails.tsx'

// Create a root route
const rootRoute = new RootRoute({
  component: () => <Root />,
})

// Define /characters route with search param 'page'
const characterListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/characters',
  component: CharacterList,

  //  Define search param 'page' so useSearch re-renders component when it changes
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search.page ?? 1), // always a number
    }
  },
})

// Define /characters/$id route
const characterDetailsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/characters/$id',
  component: CharacterDetails,
})

const NotFound = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '80vh', 
    textAlign: 'center' 
  }}>
    <h1 style={{ fontSize: 40, marginBottom: 16 }}>🚫 Page Not Found</h1>
    <p style={{ fontSize: 18, marginBottom: 24 }}>
      Sorry, the page you are looking for doesn’t exist.
    </p>
    <a 
      href="/characters?page=1" 
      style={{ 
        padding: '10px 20px', 
        borderRadius: 8, 
        textDecoration: 'none', 
        background: '#007bff', 
        color: '#fff', 
        fontWeight: 'bold' 
      }}
    >
      ⬅ Back to Characters
    </a>
  </div>
)

// ✅ Define notFoundRoute
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
})

// Assemble route tree
const routeTree = rootRoute.addChildren([
  characterListRoute,
  characterDetailsRoute,
  notFoundRoute
])

// Create router instance
export const router = new Router({ routeTree })

// Register for type safety (important in TS)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
