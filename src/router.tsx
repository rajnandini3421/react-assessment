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


const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*', 
  component: () => null,
})

// Assemble route tree
const routeTree = rootRoute.addChildren([
  characterListRoute,
  characterDetailsRoute,
  notFoundRoute
])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
