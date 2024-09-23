import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname()

  return (
    <>
      <ul className='mb-5 mt-4 flex flex-col gap-3 pl-6'>
        {item.map((item: any, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-accent hover:text-accent-foreground ${
                pathname === item.route ? 'bg-accent text-accent-foreground' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SidebarDropdown
