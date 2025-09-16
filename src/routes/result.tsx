import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/result')({
  component: Result,
})

function Result() {
  return (
    <div className="text-center">
      resultado
    </div>
  )
}
