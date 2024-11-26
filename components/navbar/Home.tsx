"use client"

import { useRouter } from "next/navigation"

const Home = () => {
    const router = useRouter()
  return (
    <div onClick={() => router.push('/')} className="bg-gray-700 px-2 py-1 rounded-md text-lg md:text-2xl cursor-pointer">Anasayfa</div>
  )
}

export default Home