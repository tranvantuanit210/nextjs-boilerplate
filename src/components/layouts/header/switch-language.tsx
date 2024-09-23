import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export function SwitchLanguage() {
  return (
    <Select defaultValue='en'>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a language' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value='en'>English</SelectItem>
          <SelectItem value='vn'>Vietnamese</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
