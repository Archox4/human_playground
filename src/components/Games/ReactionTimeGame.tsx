import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import Scoreboard from '../../util/Scoreboard'
import { Games } from '../../util/interfaces/interfaces'


const GameStatus = {
  IDLE: 0,
  WAITING: 1,
  GREEN: 2,
  TOO_EARLY: 3,
  RESULT: 4
} as const
type GameStatus = typeof GameStatus[keyof typeof GameStatus]

const ReactionTimeGame = () => {
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.IDLE)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerRef = useRef<number | null>(null)
  const [score, setScore] = useState<number | null>()
  const [latestScores, setLatestScores] = useState<number[]>([])

  useEffect(() => {
    if (gameState === GameStatus.WAITING) {
      const time = (Math.random() * 4 + 2) * 1000
      timeoutRef.current = setTimeout(() => {
        setGameState(GameStatus.GREEN)
        requestAnimationFrame(() => {
          timerRef.current = performance.now()
        })
      }, time)

      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }
  }, [gameState])

  const handleClick = () => {
    if (gameState === GameStatus.WAITING) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      setGameState(GameStatus.TOO_EARLY)
    } else if (gameState === GameStatus.GREEN) {
      if (timerRef.current) {
        const delay = Math.floor(performance.now() - timerRef.current)
        setScore(delay)
        setLatestScores([delay, ...latestScores])
        setGameState(GameStatus.RESULT)
      }
    } else if (
      gameState === GameStatus.RESULT ||
      gameState === GameStatus.TOO_EARLY
    ) {
      setGameState(GameStatus.WAITING)
      timerRef.current = null
    }
  }

  return (
    <div className='w-full grid grid-cols-5 gap-2 mt-12'>
      <Scoreboard scores={latestScores} gameType={Games.ReactionTime}/>
      <div className='w-full col-span-3 flex flex-col items-center'>
        {gameState === GameStatus.IDLE && (
          <motion.div
            className='flex justify-center items-center bg-linear-to-tl from-dark-gray-1 to-gray-800 shadow-md shadow-gray-800 w-full min-h-140 rounded-2xl cursor-pointer'
            onPointerDown={() => setGameState(GameStatus.WAITING)}
          >
            <p className='font-semibold text-2xl text-white select-none'>
              Click to start
            </p>
          </motion.div>
        )}
        {gameState === GameStatus.WAITING && (
          <motion.div
            onPointerDown={handleClick}
            className='flex justify-center items-center bg-red-500 shadow-md shadow-red-600 w-full min-h-140 rounded-2xl cursor-pointer'
          >
            <p className='font-semibold text-2xl text-black select-none'>
              Wait
            </p>
          </motion.div>
        )}
        {gameState === GameStatus.GREEN && (
          <motion.div
            onPointerDown={handleClick}
            className='flex justify-center items-center bg-green-500 shadow-md shadow-green-600 w-full min-h-140 rounded-2xl cursor-pointer'
          >
            <p className='font-semibold text-2xl text-black select-none'>
              Click now!
            </p>
          </motion.div>
        )}
        {gameState === GameStatus.TOO_EARLY && (
          <motion.div
            onPointerDown={handleClick}
            className='flex flex-col space-y-2 justify-center items-center bg-red-500 shadow-md shadow-red-600 w-full min-h-140 rounded-2xl cursor-pointer'
          >
            <p className='font-semibold text-2xl text-black select-none'>
              Too early!
            </p>
            <p className='font-semibold text-md text-gray-800 select-none'>
              Click to retry
            </p>
          </motion.div>
        )}
        {gameState === GameStatus.RESULT && (
          <motion.div
            onPointerDown={handleClick}
            className='flex flex-col justify-center items-center bg-green-500 shadow-md shadow-green-600 w-full min-h-140 rounded-2xl cursor-pointer'
          >
            <p className='font-semibold text-2xl text-black select-none'>
              Your score is:
            </p>
            <p className='font-semibold text-4xl text-gray-800 pt-2 select-none'>
              {score} ms
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ReactionTimeGame
