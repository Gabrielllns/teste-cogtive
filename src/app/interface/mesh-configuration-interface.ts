import { TestingStage } from "../service/testing-stage.service";

/**
 * Interface responsável pala variável de controle configurações do 'terreno/malha'.
 *
 * @author Gabriel Neres
 */
export interface MeshConfiguration {
  inputMeshSizeX?: number; // Linha
  inputMeshSizeY?: number; // Coluna
  testingStage: TestingStage
}