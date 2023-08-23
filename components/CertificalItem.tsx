import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CertificalItem = ({certifical}:any) => {
  return (
<>
<div className='card '>
  <div className='flex flex-col items-center justify-center p-5'>
<Link href={`/certifical/${certifical.slug}`}>
    <Image 
     src={certifical.image}
     alt={certifical.name}
     width={300}
     height={300}
     className='rounded shadow items-center '

    />
</Link>
</div>
<div className='flex flex-col items-center justify-center p-5'>
<Link href={`/certifical/${certifical.slug}`}>
    <h2 className='text-xl font-medium'> {certifical.name}</h2>
</Link>


</div>
<div className='flex justify-center py-4'>
  <Link href={`/certifical/${certifical.slug}`}>
    <p className='text-indigo400'>Detalhes</p>
</Link>
</div>
<h2 className='text-xl font-medium'> {certifical.date}</h2>
</div>
</>
  )
}

export default CertificalItem
