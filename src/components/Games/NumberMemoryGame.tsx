import { motion } from 'motion/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Liquidpart from '../../util/animations/Liquidpart'
import { Games } from '../../util/interfaces/interfaces'
import Scoreboard from '../../util/Scoreboard'

const GameStatus = {
  IDLE: 0,
  REMEMBER: 1,
  TYPE: 2,
  CORRECT: 3,
  WRONG: 4
} as const
type GameStatus = typeof GameStatus[keyof typeof GameStatus]

const NumberMemoryGame = () => {
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.IDLE)
  const [randomNumber, setRandomNumber] = useState<string | null>(null)
  const [score, setScore] = useState<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const answerRef = useRef<HTMLInputElement>(null)
  const [latestScores, setLatestScores] = useState<number[]>([])
  const estimated = useMemo(() => {
    return (score + 4) * 700 + 2000
  }, [score])

  const nextNumber = (newScore: number) => {
    let random: string = ''
    let i = 0
    while (i < newScore + 4) {
      random += Math.floor(Math.random() * 10)
      i++
    }
    setRandomNumber(random)
    setGameState(GameStatus.REMEMBER)
  }
  const cleanup = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const checkAnswer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const answer = answerRef.current?.value
    if (!answer) {
      setGameState(GameStatus.WRONG)
      return
    }
    setGameState(
      answer === randomNumber ? GameStatus.CORRECT : GameStatus.WRONG
    )
  }

  useEffect(() => {
    const estimatedTime = (score + 4) * 700 + 2000
    if (gameState === GameStatus.REMEMBER) {
      timeoutRef.current = setTimeout(() => {
        setGameState(GameStatus.TYPE)
      }, estimatedTime)
    } else if (gameState === GameStatus.TYPE) {
      timeoutRef.current = setTimeout(() => {
        checkAnswer()
      }, estimatedTime + 1000)
    } else if (gameState === GameStatus.CORRECT) {
      const newScore = score + 1
      setScore(newScore)
      nextNumber(newScore)
    } else if (gameState === GameStatus.WRONG) {
      if (score !== 0) setLatestScores([score, ...latestScores])
      setScore(0)
      setGameState(GameStatus.WRONG)
    }
    return cleanup
  }, [gameState])

  const handleClick = () => {
    if (gameState === GameStatus.IDLE || gameState === GameStatus.WRONG) {
      setScore(0)
      nextNumber(0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer()
    }
  }

  return (
    <div className='w-full grid grid-cols-5 gap-2 mt-12'>
      <Scoreboard scores={latestScores} gameType={Games.NumberMemory} />
      <div className='flex order-1 flex-col xl:flex-row xl:col-span-3 xl:col-start-2 col-span-5 col-start-1 min-h-100 w-full items-start'>
        <div className='flex flex-col justify-center items-center px-10 w-full'>
          <p className='w-full text-5xl font-semibold text-start pt-1'>
            Number Memory
          </p>
          <div className='flex flex-row mt-5 space-x-5 w-full'>
            <div className='flex flex-col'>
              <p className='text-default-text font-semibold text-md'>
                CURRENT SCORE
              </p>
              <p className='text-4xl text-blue-300 font-semibold text-start'>
                {score}
              </p>
            </div>
          </div>
          <div className='relative w-full z-0 overflow-hidden mt-10 rounded-2xl bg-linear-to-tl from-gray-wordsbox-1/70 to-gray-wordsbox-2/70 shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] shadow-olive-800'>
            {gameState === GameStatus.REMEMBER && (
              <Liquidpart endVal={0} startVal={100} time={estimated} />
            )}
            {gameState === GameStatus.TYPE && (
              <Liquidpart endVal={100} startVal={0} time={estimated + 1000} />
            )}
            <div className='relative z-10'>
              <div
                onPointerDown={handleClick}
                className='cursor-pointer flex flex-col w-full items-center justify-center min-h-70'
              >
                {gameState === GameStatus.IDLE && (
                  <>
                    <p className='text-6xl text-white font-bold select-none'>
                      Click to start
                    </p>
                  </>
                )}
                {gameState === GameStatus.REMEMBER && (
                  <>
                    <p className='text-6xl text-white font-bold select-none'>
                      {randomNumber}
                    </p>
                  </>
                )}
                {gameState === GameStatus.TYPE && (
                  <>
                    <input
                      type='text'
                      ref={answerRef}
                      onKeyDown={handleKeyDown}
                      className='px-4 py-2 w-[80%] rounded-md bg-dark-gray-1 border border-dark-navbar shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] text-center'
                      placeholder='Type the number...'
                      autoFocus
                    />
                  </>
                )}
                {gameState === 4 && (
                  <p className='text-3xl text-red-500 font-semibold'>Wrong</p>
                )}
              </div>
            </div>
          </div>
          <p className='pt-10 text-default-text text-center'>
            You can press <span className='text-xl text-blue-500'>[ENTER]</span>{' '}
            to confirm before time runs out! <br />
            Remember number as long as you can!
          </p>
        </div>
      </div>
    </div>
  )
}

export default NumberMemoryGame
