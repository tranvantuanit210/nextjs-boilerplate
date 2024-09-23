//             _oo0oo_
//            o8888888o
//            88" . "88
//            (| -_- |)
//            0\  =  /0
//          ___/`---'\___
//        .' \\|     |// '.
//       / \\|||  :  |||// \
//      / _||||| -:- |||||- \
//     |   | \\\  -  /// |   |
//     | \_|  ''\---/''  |_/ |
//     \  .-\__  '-'  ___/-. /
//   ___'. .'  /--.--\  `. .'___
// ."" '<  `.___\_<|>_/___.' >' "".
// | | :  `- \`.;`\ _ /`;.`/ - ` : | |
// \  \ `_.   \_ __\ /__ _/   .-` /  /
// ======`-.____`.___ \_____/___.-`____.-'======
//              `=---='

'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function DropdownAvatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='overflow-hidden rounded-full'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.pngg' alt='@shadcn' />
            <AvatarFallback>VN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Vu Nguyen</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/manage/setting'} className='cursor-pointer'>
            Setting
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
