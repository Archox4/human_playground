import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { Games } from './interfaces/interfaces'

const Scoreboard = ({
  scores,
  gameType
}: {
  scores: number[]
  gameType: Games
}) => {
  return (
    <div className='w-2/3 h-fit max-h-160 flex flex-col justify-center ms-5 p-2 rounded-lg bg-linear-to-bl from-dark-gray-1 to-gray-900 shadow-2xl shadow-black'>
      <h2 className='pb-2'>LAST SCORES</h2>
      {scores.length > 0 ? (
        <ul className='space-y-2 w-full overflow-hidden hover:overflow-y-auto [scrollbar-gutter:stable]'>
          <AnimatePresence mode='popLayout'>
            {scores.map((score, i) => {
              return (
                <motion.li
                  key={scores.length - i}
                  className='font-semibold cursor-pointer select-none border-b border-dark-gray-1 text-left ps-4'
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className='flex flex-row items-baseline justify-start'>
                    <p
                      className={`w-10 text-sm font-semibold ${
                        i === 0 ? 'text-cyan-main' : 'text-default-text'
                      }`}
                    >
                      {scores.length < 10
                        ? '0' + (scores.length - i).toString()
                        : scores.length - i}
                    </p>
                    <p className='text-3xl'>{score}</p>
                    <p
                      className={`w-10 ps-1 text-sm font-light ${
                        i === 0 ? 'text-cyan-main' : 'text-default-text'
                      }`}
                    >
                      {gameType === Games.ReactionTime && 'ms'}
                      {gameType === Games.NumberMemory && 'lvl'}
                      {gameType === Games.WordMemory && 'lvl'}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      ) : (
        <p className='text-default-text'>no scores yet</p>
      )}
    </div>
  )
}

export default Scoreboard
