"use client"

import { useRouter } from "next/navigation"

const Gelir = () => {
    const router = useRouter()
  return (
    <div onClick={() => router.push('/form')} className="bg-gray-700 px-2 py-1 rounded-md text-lg md:text-2xl cursor-pointer">Gelir Ekle </div>
  )
}

export default Gelir