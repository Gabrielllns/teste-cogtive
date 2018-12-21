import { Stage } from "../service/stage.service";

/**
 * Interface responsável pala variável de controle configurações do 'terreno/malha'.
 *
 * @author Gabriel Neres
 */
export interface MeshConfiguration {
  stage: Stage;
  inputMeshSizeX?: number; // Linha
  inputMeshSizeY?: number; // Coluna
}