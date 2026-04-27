import { GitBranch } from 'lucide-react'
import React from 'react'
import Github from '../assets/github.svg?react'

const Footer = () => {
  return (
    <footer className='flex flex-col mt-20 px-10 py-10 justify-between w-full bg-linear-to-t from-[#141414] to-dark-gray-1/0'>
      <div className='flex flex-row justify-around w-full'>
        <p className='text-3xl font-bold'>PLAYGROUND</p>
        <div className='flex flex-row justify-between space-x-10 w-1/6'>
          <p className='hover:text-cyan-main cursor-pointer'>About</p>
          <p className='hover:text-cyan-main cursor-pointer'>Privacy</p>
          <p className='hover:text-cyan-main cursor-pointer'>Terms</p>
        </div>
        <div className='flex flex-col w-1/6 justify-end items-end'>
          <p>@2026</p>
          <a href='https://github.com/archox4' className='flex flex-row items-center gap-2 hover:text-cyan-main transition-colors'>
            <Github />
            <p>
              @Archox4
            </p>
          </a>
        </div>
      </div>
      <div></div>
    </footer>
  )
}

export default Footer
