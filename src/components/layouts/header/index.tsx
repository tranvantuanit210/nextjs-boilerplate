import Link from 'next/link'
import Image from 'next/image'
import DropdownAvatar from './dropdown-avatar'
import { SwitchLanguage } from './switch-language'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SwitchMode } from './switch-mode'

const Header = (props: { sidebarOpen: string | boolean | undefined; setSidebarOpen: (arg0: boolean) => void }) => {
  return (
    <header className='sticky top-0 z-10 flex w-full bg-background drop-shadow-1'>
      <div className='flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-12'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            onClick={(e) => {
              e.stopPropagation()
              props.setSidebarOpen(!props.sidebarOpen)
            }}
            className='z-10 block rounded-sm border bg-background p-2 shadow-sm lg:hidden'
          >
            <span className='relative block h-[1.35rem] w-[1.35rem] cursor-pointer'>
              <span className='absolute right-0 h-full w-full'>
                <span
                  className={`relative left-0 top-0 my-1 block h-[2px] w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-[2px] w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-[2px] w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className='absolute right-0 h-full w-full rotate-45'>
                <span
                  className={`absolute left-2.5 top-0 block h-full w-[2px] rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-0'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-[2px] w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className='block flex-shrink-0 lg:hidden' href='/'>
            <Image width={130} height={24} src={'/logo.png'} alt='Logo' priority className='dark:invert-1' />
          </Link>
        </div>

        <div className='hidden sm:block'>
          <form action='https://formbold.com/s/unique_form_id' method='POST'>
            <div className='relative'>
              <button className='absolute left-0 top-1/2 -translate-y-1/2'>
                <Search color='#64748B' />
              </button>

              <Input
                placeholder='Type to search...'
                className='w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none border-0 xl:w-96 placeholder:text-[#64748B]'
              />
            </div>
          </form>
        </div>

        <div className='flex items-center gap-3'>
          <SwitchMode />
          <DropdownAvatar />
          <SwitchLanguage />
        </div>
      </div>
    </header>
  )
}

export default Header
