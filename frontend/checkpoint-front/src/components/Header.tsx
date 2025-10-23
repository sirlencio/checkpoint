import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Image
          src="/images/checklogo.png" // Ruta dentro de /public
          alt="Logo CheckPoint"
          width={40} // ajusta tamaño según necesites
          height={40}
          className="object-contain"
        />
        <h1 className="text-2xl font-bold text-white-400">CheckPoint</h1>
      </div>

      <nav className="space-x-4 text-white">
        <Link href="/" className="hover:text-green-400 transition">
          Inicio
        </Link>
        <Link href="/library" className="hover:text-green-400 transition">
          Mis Juegos
        </Link>
        <Link href="/stats" className="hover:text-green-400 transition">
          Estadísticas
        </Link>
      </nav>
    </header>
  )
}
