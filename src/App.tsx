import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from './MainLayout'
import MainPage from './MainPage'
import { GamesContext } from './util/GamesContext'
import type { GameElement } from './util/interfaces/interfaces'
import {
  NumberMemorySlide,
  ReactionTimeSlide,
  WordMemorySlide
} from './util/Slides'
import { WordMemoryGame } from './components/Games/WordMemoryGame'
import ReactionTimeGame from './components/Games/ReactionTimeGame'
import NumberMemoryGame from './components/Games/NumberMemoryGame'
import { motion, AnimatePresence } from 'motion/react'
import type { ReactElement } from 'react'

function App () {
  const games: GameElement[] = [
    {
      name: 'Number Memory',
      component: <NumberMemorySlide />,
      pathTo: '/numberMemory',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum leo eu purus auctor placerat. Nam vitae luctus orci. Sed commodo dignissim augue, vel ornare neque rhoncus sed. Maecenas ornare sit amet nisi non pellentesque. Morbi lacinia mi ac cursus dictum. Praesent consectetur leo vitae orci hendrerit consectetur.'
    },
    {
      name: 'Reaction Time',
      component: <ReactionTimeSlide />,
      pathTo: '/reactionGame',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum leo eu purus auctor placerat. Nam vitae luctus orci. Sed commodo dignissim augue, vel ornare neque rhoncus sed. Maecenas ornare sit amet nisi non pellentesque. Morbi lacinia mi ac cursus dictum. Praesent consectetur leo vitae orci hendrerit consectetur.'
    },
    {
      name: 'Words Memory',
      component: <WordMemorySlide />,
      pathTo: '/wordsGame',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur condimentum leo eu purus auctor placerat. Nam vitae luctus orci. Sed commodo dignissim augue, vel ornare neque rhoncus sed. Maecenas ornare sit amet nisi non pellentesque. Morbi lacinia mi ac cursus dictum. Praesent consectetur leo vitae orci hendrerit consectetur.'
    }
  ]
  const location = useLocation()
  return (
    <GamesContext.Provider value={games}>
      <div>
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<MainLayout />}>
              <Route
                index
                element={
                  <PageTransition>
                    <MainPage />
                  </PageTransition>
                }
              />
              <Route
                path='/wordsGame'
                element={
                  <PageTransition>
                    <WordMemoryGame />
                  </PageTransition>
                }
              />
              <Route
                path='/reactionGame'
                element={
                  <PageTransition>
                    <ReactionTimeGame />
                  </PageTransition>
                }
              />
              <Route
                path='/numberMemory'
                element={
                  <PageTransition>
                    <NumberMemoryGame />
                  </PageTransition>
                }
              />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </GamesContext.Provider>
  )
}

function PageTransition ({ children }:{children: ReactElement}) {
  return (
    <motion.main
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {children}
    </motion.main>
  )
}

export default App
