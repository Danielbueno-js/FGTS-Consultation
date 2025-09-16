import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-neutral-50 text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/simulation">Simulação</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/result">Resultado</Link>
        </div>
      </nav>
    </header>
  )
}
