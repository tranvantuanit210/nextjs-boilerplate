import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SidebarDropdown from './sidebarDropdown'
import { ChevronDown } from 'lucide-react'

const SidebarItem = ({ item, pageName, setPageName }: any) => {
  const handleClick = () => {
    const updatedPageName = pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : ''
    return setPageName(updatedPageName)
  }

  const pathname = usePathname()

  const isActive = (item: any) => {
    if (item.route === pathname) return true
    if (item.children) {
      return item.children.some((child: any) => isActive(child))
    }
    return false
  }

  const isItemActive = isActive(item)
  const Icon = item.icon

  return (
    <>
      <li>
        <Link
          href={item.route}
          onClick={handleClick}
          className={`${isItemActive ? 'bg-accent text-accent-foreground' : ''} group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-accent hover:text-accent-foreground`}
        >
          <Icon className='w-5 h-5' />
          {item.label}
          {item.children && (
            <ChevronDown
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                pageName === item.label.toLowerCase() && 'rotate-180'
              }`}
            />
          )}
        </Link>

        {item.children && (
          <div className={`translate transform overflow-hidden ${pageName !== item.label.toLowerCase() && 'hidden'}`}>
            <SidebarDropdown item={item.children} />
          </div>
        )}
      </li>
    </>
  )
}

export default SidebarItem
