/**
 * Interface responsável pala variável de controle das 'Sondas'.
 *
 * @author Gabriel Neres
 */
export interface ProbeControl {
  initialPositionX?: number; // Linha
  initialPositionY?: number; // Coluna
  initialDirection?: string;
  listCommands?: string
  currentPositionX?: number; // Linha
  currentPositionY?: number; // Coluna
  currentDirection?: string;
}
