import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">

      {/* Botón principal con efecto de gradiente */}
      <Link
        href="/register"
        className="bg-gradient-to-r from-gray-800  to-blue-400  hover:to-green-500 
                   text-white text-2xl font-bold py-8 px-8 rounded-2xl shadow-lg hover:shadow-2xl 
                   transform hover:-translate-y-1 transition-all duration-300 drop-shadow-[2px_2px_2px_black]"
      >
        Crea una cuenta gratuita
      </Link>

      {/* Texto secundario con hover verde */}
      <p className=" text-gray-300 font-bold text-sm drop-shadow-[1px_1px_2px_black]">
        o si estás registrado,{" "}
        <Link
          href="/login"
          className=" text-white font-bold hover:text-green-500 transition-colors duration-300"
        >
          haz Log In
        </Link>
      </p>

    </div>
  );
}
