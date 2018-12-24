import { Injectable } from '@angular/core';

/**
 * Classe de mapeamento com as possíves representações de 'Stage'.
 *
 * @author Gabriel Neres
 */
export class Stage {

  public static SETTING_MESH: Stage = new Stage(1, "Configurando a Malha", 2);
  public static SETTING_PROBE: Stage = new Stage(2, "Configurando as Sondas", 3);
  public static CONTROLLING_PROBE: Stage = new Stage(3, "Controlando as Sondas", 4);
  public static SIMULATION: Stage = new Stage(4, "Simulação", 4);

  /**
   * Construtor da classe.
   *
   * @param id
   * @param description
   * @param nextStage
   */
  constructor(public id: number, public description: string, public nextStage: number) { }

  /**
   * Retorna a instância de 'Stage' conforme o 'id' informado.
   *
   * @param id
   *
   * @returns Stage
   */
  public static findById(id: number): Stage {

    switch (id) {
      case 1:
        return Stage.SETTING_MESH;
      case 2:
        return Stage.SETTING_PROBE;
      case 3:
        return Stage.CONTROLLING_PROBE;
      case 4:
        return Stage.SIMULATION;
      default:
        return undefined;
    }
  }
}

/**
 * Classe de service para controle do 'Stage'.
 *
 * @author Gabriel Neres
 */
@Injectable()
export class StageService {

  /**
   * Construtor do service.
   */
  constructor() { }

  /**
   * Valida se o 'Stage' informado é igual a 'SETTING_MESH'.
   *
   * @param stage
   *
   * @returns boolean
   */
  public isStageSettingMesh(stage: Stage): boolean {
    return stage.id === Stage.SETTING_MESH.id;
  }

  /**
   * Valida se o 'Stage' informado é igual a 'SETTING_PROBE'.
   *
   * @param stage
   *
   * @returns boolean
   */
  public isStageSettingProbe(stage: Stage): boolean {
    return stage.id === Stage.SETTING_PROBE.id;
  }

  /**
   * Valida se o 'Stage' informado é igual a 'CONTROLLING_PROBE'.
   *
   * @param stage
   *
   * @returns boolean
   */
  public isStageControllingProbe(stage: Stage): boolean {
    return stage.id === Stage.CONTROLLING_PROBE.id;
  }
  /**
   * Valida se o 'Stage' informado é igual a 'SIMULATION'.
   *
   * @param stage
   *
   * @returns boolean
   */
  public isStageSimulation(stage: Stage): boolean {
    return stage.id === Stage.SIMULATION.id;
  }

  /**
   * Avança o estágio da aplicação com base no estágio atual informado.
   *
   * @param currentTestingStage
   *
   * @returns Stage
   */
  public nextStage(currentTestingStage: Stage): Stage {
    return Stage.findById(currentTestingStage.nextStage);
  }

}
