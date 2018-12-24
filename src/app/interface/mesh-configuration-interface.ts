import { Stage } from "../service/stage.service";

/**
 * Interface responsável pala variável de controle configurações do(a) 'terreno/malha'.
 *
 * @author Gabriel Neres
 */
export interface MeshConfiguration {
  stage: Stage;
  initialX: number; // Linha
  initialY: number; // Coluna
  finishSizeX?: number; // Linha
  finishSizeY?: number; // Coluna
  isDisabledRoleSquareMatrix?: boolean;
}