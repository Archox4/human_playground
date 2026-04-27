import { motion } from 'motion/react'

const Liquidpart = ({ time, startVal, endVal }: { startVal: number; endVal: number; time: number }) => {
  // const wavePathA =
  //   "M 0,20 C 7.8,18 19,19 25,20 35,23 40,24 50,20 56,17 66,19 75,20 86,22 91,25 100,20 V 100 H 0 Z"
  // const wavePathB =
  //   "M 0,20 C 9.4,23 15,23 25,20 32,18 42,17 50,20 59,23 65,23 75,20 82,18 91,17 100,20 V 100 H 0 Z"
  const wavePathA =
    'M 0,-1.1 C 7.8,-3.1 18,-2.2 25,-1.1 35,0.49 39,1 50,-1.1 57,-2.3 71,-2 75,-1.1 87,1.6 90,0.73 100,-1.1 V 80 H 0 Z'
  const wavePathB =
    'M -0.01,-0.35 C 9.6,2.2 15,1.4 25,-0.36 32,-1.7 41,-2 50,-0.36 59,1.3 65,1 75,-0.36 83,-1.4 90,-3 100,-0.36 V 81 H 0 Z'

  return (
    <div className='absolute inset-0 w-full h-full rounded-2xl overflow-hidden pointer-events-none z-0'>
      <motion.svg
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        className='relative w-[200%] h-[200%] left-0'
        initial={{ x: '-50%', top: `${startVal}%` }}
        animate={{
          x: '0%',
          top: `${endVal}%`
        }}
        transition={{
          x: { repeat: Infinity, duration: time / 1000, ease: 'linear' },
          top: { type: 'tween', duration: time / 1000, ease: 'linear' }
        }}
      >
        <defs>
          <linearGradient id='gradientWave' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#1e40af' />
            <stop offset='100%' stopColor='#0088ff' />
          </linearGradient>
        </defs>
        <motion.path
          fill='url(#gradientWave)'
          initial={{ d: [wavePathA] }}
          animate={{ d: [wavePathA, wavePathB, wavePathA] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'linear'
          }}
        />
      </motion.svg>
    </div>
  )
}

export default Liquidpart
