import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_ResultSimulation/result')({
  component: Result,
})

function Result() {
  return (
    <div className="text-center">
      resultado
    </div>
  )
}
