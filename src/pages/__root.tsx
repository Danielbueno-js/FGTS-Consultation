import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import backGroundImageUrl from '@/assets/hero.jpg'

interface MyRouterContext {
  queryClient: QueryClient
}

const dotsSvg = encodeURIComponent(`
  <svg width="30" height="14" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="2" r="2" fill="#111827" fill-opacity="0.50"/>
    <circle cx="2"  cy="2" r="2" fill="#111827" fill-opacity="0.50"/>
    <circle cx="14" cy="2" r="2" fill="#111827" fill-opacity="0.50"/>
  </svg>
`);


export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="w-full min-h-screen flex relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src={backGroundImageUrl}
          alt="background"
          className="w-full h-full sm:w-2/3 object-cover size-full object-top brightness-30"
          draggable={false}
        />
        <div
          className="brightness-98 absolute top-0 right-0 h-full w-1/2 bg-[#002252] clip-diagonal"
          style={{
            backgroundImage: `url("data:image/svg+xml,${dotsSvg}")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '40px 24px',
          }}
        />
      </div>
      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
  ),
})