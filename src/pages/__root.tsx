import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import Header from '../components/Header'


import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

const backGroundImageUrl = "src/assets/hero.jpg"

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${backGroundImageUrl})`,
        }}
      >

        <Outlet />
      </div>
    </>
  ),
})
