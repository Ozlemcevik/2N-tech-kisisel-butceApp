"use client"

import { useRouter } from "next/navigation"

const Rapor = () => {
    const router = useRouter()
  return (
    <div onClick={() => router.push('/rapor')} className="bg-gray-700 px-2 py-1 rounded-md text-lg md:text-2xl cursor-pointer">Raporlar</div>
  )
}

export default Rapor