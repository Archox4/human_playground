import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function ReactionTimeSlide () {
  return (
    <Link to="/reactionGame">
        <div className='flex flex-col w-full h-full group'>
          <div className='grid place-items-center h-full rounded-2xl shadow-[0_0_20px_5px_rgba(0,0,0,0.3)] shadow-red-500 bg-red-600 transition-all duration-300 group-hover:bg-green-500 group-hover:shadow-green-500'>
            <p className='text-2xl col-start-1 row-start-1 transition-all delay-60 duration-50 opacity-100 group-hover:opacity-0'>
              Wait for green...
            </p>
            <p className='text-2xl col-start-1 row-start-1 transition-all delay-60 duration-50 opacity-0 group-hover:opacity-100'>
              Click now!
            </p>
          </div>
        </div>
    </Link>
  )
}

export function WordMemorySlide () {
  return (
    <Link to='/wordsGame'>
      <div className='flex flex-col w-full h-full group'>
        <div className='grid place-items-center h-full rounded-2xl shadow-[0_0_20px_5px_rgba(0,0,0,0.3)] shadow-dark-gray-1'>
          <p className='text-xl col-start-1 row-start-1 text-blue-400 place-start'>
            Word 26
          </p>
          <p className='text-5xl col-start-1 row-start-2'>Bannana</p>
          <div className='flex flex-row w-2/4 justify-between'>
            <div
              className='bg-gray-700 px-15 py-4 rounded-2xl shadow-[0_0_3px_5px_rgba(0,0,0,0.3)] shadow-gray-700
                        transition-transform hover:-translate-y-4'
            >
              Seen ?
            </div>
            <div
              className='bg-blue-300 px-15 py-4 rounded-2xl shadow-[0_0_3px_5px_rgba(0,0,0,0.3)] shadow-blue-300
                        transition-transform hover:-translate-y-4'
            >
              New ?
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function NumberMemorySlide () {
  const [inputText, setInputText] = useState<string>('')
  const [animPhase, setPhase] = useState<'wait' | 'typing'>('wait')
  const textToDisplay: string = 'Type number...'
  const [randomNumber, setRandomNumber] = useState(() =>
    Math.floor(Math.random() * 10000000)
  )

  useEffect(() => {
    if (animPhase === 'wait') {
      setInputText('')
      const timer = setTimeout(() => {
        setPhase('typing')
      }, 5000)
      return () => clearTimeout(timer)
    } else {
      let i = 0
      setRandomNumber(() => Math.floor(Math.random() * 10000000))
      const interval = setInterval(() => {
        setInputText(textToDisplay.slice(0, i + 1))
        i += 1

        if (i === textToDisplay.length) {
          clearInterval(interval)
          setTimeout(() => {
            setPhase('wait')
          }, 4500)
        }
      }, 100)

      return () => clearInterval(interval)
    }
  }, [animPhase])

  return (
    <Link to="/numberMemory">
        <div className='flex flex-col justify-between items-center py-10  h-full w-full rounded-2xl shadow-[0_0_20px_5px_rgba(0,0,0,0.3)]'>
          {animPhase === 'wait' && (
            <div className='w-full h-full flex flex-col items-center'>
              <div className='flex justify-left w-2/3 my-10'>
                <div
                  className='h-0.5 w-full col-start-1 row-start-1 shadow-[0_0_2px_1px_rgba(0,0,0,0.3)] shadow-cyan-main bg-cyan-main rounded-full
                                animate-width-loop'
                ></div>
              </div>
              <p className='text-cyan-main text-2xl pb-4'>Remember the number</p>
              <p className='text-default-text text-2xl mt-10'>{randomNumber}</p>
            </div>
          )}
          {animPhase === 'typing' && (
            <div className='w-100 h-10 rounded-2xl bg-dark-gray-1 shadow-2xl shadow-black flex justify-start mt-25 px-4 py-2'>
              <p className='text-default-text'>{inputText}</p>
            </div>
          )}
            <div className='text-gray-200 bg-cyan-main transition-transform hover:-translate-y-1 px-6 py-2 font-bold rounded-xl shadow-[0_0_12px_1px_rgba(0,0,0,0.3)] shadow-cyan-500'>
              PLAY
            </div>
        </div>
    </Link>
  )
}
