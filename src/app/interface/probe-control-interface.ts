import { Action } from "../service/action.service";

/**
 * Interface responsável pala variável de controle das 'Sondas'.
 *
 * @author Gabriel Neres
 */
export interface ProbeControl {
  initialPositionX?: number; // Linha
  initialPositionY?: number; // Coluna
  initialDirection?: number;
  listCommands?: string
  currentPositionX?: number; // Linha
  currentPositionY?: number; // Coluna
  currentDirection?: number;
}
