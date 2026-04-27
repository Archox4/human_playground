import type { ReactElement } from "react"

export interface GameElement {
    name: string,
    component: ReactElement,
    pathTo: string,
    description: string
}

export const Games = {
  ReactionTime: "ReactionGame",
  NumberMemory: "NumberMemory",
  WordMemory: "WordMemory"
} as const;

export type Games = (typeof Games)[keyof typeof Games]
