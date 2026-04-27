import { createContext } from "react";
import type { GameElement } from "./interfaces/interfaces";

export const GamesContext = createContext<GameElement[] | null>(null);