import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-800 p-4 border-r border-gray-700 hidden md:block">
      <ul className="space-y-4">
        <li>
          <Link href="/" className="hover:text-green-400">Dashboard</Link>
        </li>
        <li>
          <Link href="/library" className="hover:text-green-400">Biblioteca</Link>
        </li>
        <li>
          <Link href="/wishlist" className="hover:text-green-400">Wishlist</Link>
        </li>
        <li>
          <Link href="/profile" className="hover:text-green-400">Perfil</Link>
        </li>
      </ul>
    </aside>
  )
}
