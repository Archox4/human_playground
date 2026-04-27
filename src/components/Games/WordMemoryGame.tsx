import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { wordsList } from '../../util/interfaces/WordsList'
import Scoreboard from '../../util/Scoreboard'
import { Games } from '../../util/interfaces/interfaces'

export const WordMemoryGame = () => {
  const [wordsSeen, setWordsSeen] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [randomWords, setRandomWords] = useState<string[]>([])
  const [score, setScore] = useState<number>(0)
  const [gameState, setGameState] = useState<number>(0)
  const [latestScores, setLatestScores] = useState<number[]>([])

  const nextWord = () => {
    if (randomWords.length === 0) return
    let newWord
    do {
      newWord = randomWords[Math.floor(Math.random() * randomWords.length)]
    } while (newWord === selectedWord && wordsList.length > 1)
    setSelectedWord(newWord.toUpperCase())
  }
  const addUniqueWords = () => {
    setRandomWords(prev => {
      const available = wordsList.filter(w => !prev.includes(w))
      const shuffled = available.sort(() => 0.5 - Math.random())
      const toAdd = shuffled.slice(0, 10)

      return [...prev, ...toAdd]
    })
  }
  const setstartingPoolOfWords = () => {
    setRandomWords(prev => {
      const available = wordsList.filter(w => !prev.includes(w))
      const shuffled = available.sort(() => 0.5 - Math.random())
      const toAdd = shuffled.slice(0, 20)
      return [...prev, ...toAdd]
    })
  }
  const reset = () => {
    setScore(0)
    setWordsSeen([])
    setRandomWords([])
  }
  const nextStage = () => {
    setScore(prev => prev + 1)
  }
  useEffect(() => {
    if (gameState === 0) {
      reset()
      setstartingPoolOfWords()
      setGameState(1)
    } else if (gameState === 1) {
      if (score % 10 === 0 && score != 0) {
        if (score === 300) {
          setGameState(3)
        }
        addUniqueWords()
      }
      nextWord()
    } else if (gameState === 2) {
      if (score > 0) setLatestScores([score, ...latestScores])
    }
  }, [gameState, score])

  const handleOptionSeen = () => {
    if (wordsSeen.find(word => word === selectedWord) === undefined) {
      setGameState(2)
    } else {
      nextStage()
    }
  }

  const handleOptionNew = () => {
    if (selectedWord === null) return
    if (wordsSeen.find(word => word === selectedWord) === undefined) {
      setWordsSeen(prev => [...prev, selectedWord])
      nextStage()
    } else {
      setGameState(2)
    }
  }

  return (
    <div className='w-full grid grid-cols-5 gap-2 mt-12'>
      <Scoreboard scores={latestScores} gameType={Games.WordMemory} />
      <div className='flex col-span-3 col-start-2 justify-center min-h-100 w-full items-start'>
        <div className='flex flex-col justify-center items-center px-10 w-full'>
          <p className='w-full text-5xl font-semibold text-start pt-1'>
            Words Memory
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
            <div className='flex flex-col'>
              <p className='text-default-text font-semibold text-md'>
                VAULT POOL
              </p>
              <p className='text-4xl text-white font-semibold text-start'>
                {randomWords.length}
              </p>
            </div>
          </div>
          <div className='flex flex-col w-full items-center justify-center mt-10 min-h-70 bg-linear-to-tl from-gray-wordsbox-1/70 to-gray-wordsbox-2/70 rounded-2xl shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] shadow-olive-800'>
            {gameState === 1 && (
              <>
                <motion.p
                  key={selectedWord}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ease: 'easeIn', duration: 0.2 }}
                  className='text-6xl text-white font-bold select-none'
                >
                  {selectedWord !== null && selectedWord}
                </motion.p>
              </>
            )}
            {gameState === 2 && (
              <>
                <p className='text-3xl'>
                  Finished with score of{' '}
                  <span className='text-green-500'>{score}</span>
                </p>
              </>
            )}
            {gameState === 3 && (
              <p className='text-3xl text-green-500 font-semibold'>
                Finished full game of 100 words!!!
              </p>
            )}
          </div>
          <div></div>
          <div className='flex flex-row justify-center mt-12'>
            {gameState === 1 && (
              <div className='flex flex-row space-x-15 justify-between items-center'>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    background: 'linear-gradient(330deg, #00CCFF, #FFFFFF)',
                    color: 'black'
                  }}
                  transition={{ duration: 0.2 }}
                  whileFocus={{ scale: 0.95 }}
                  initial={{ background: 'transparent' }}
                  className='border-cyan-main border px-30 py-5 rounded-2xl shadow-md shadow-gray-900
                                cursor-pointer'
                  onClick={handleOptionSeen}
                >
                  Seen
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    background: 'linear-gradient(330deg, #FFFFFF, #00CCFF)',
                    color: 'black'
                  }}
                  transition={{ duration: 0.2 }}
                  whileFocus={{ scale: 0.95 }}
                  initial={{ background: 'transparent' }}
                  className='border-cyan-main border px-30 py-5 rounded-2xl shadow-md shadow-gray-900
                                cursor-pointer'
                  onClick={handleOptionNew}
                >
                  New
                </motion.button>
              </div>
            )}
            {gameState === 2 && (
              <motion.button
                whileHover={{
                  scale: 1.1,
                  background:
                    'linear-gradient(330deg, var(--color-green-500), var(--color-green-300))'
                }}
                initial={{
                  background:
                    'linear-gradient(330deg, var(--color-green-500), var(--color-green-200))'
                }}
                transition={{ duration: 0.2 }}
                whileFocus={{ scale: 0.95 }}
                className='text-black px-30 py-5 rounded-2xl shadow-md shadow-gray-900 cursor-pointer'
                onClick={() => setGameState(0)}
              >
                Try again!
              </motion.button>
            )}
          </div>
          <p className='pt-10 text-default-text max-w-90 text-center'>
            Identify if the word has appeared in this session. Accuracy boosts
            neural resonance scoring.
          </p>
        </div>
      </div>
    </div>
  )
}
