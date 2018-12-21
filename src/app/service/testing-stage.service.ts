import { Injectable } from '@angular/core';

/**
 * Classe de mapeamento com as possíves representações de 'TestingStage'.
 *
 * @author Gabriel Neres
 */
export class TestingStage {

  public static SETTING_MESH: TestingStage = new TestingStage(1, "Configurando a Malha", 2);
  public static SETTING_PROBE: TestingStage = new TestingStage(2, "Configurando as Sondas", 3);
  public static CONTROLLING_PROBE: TestingStage = new TestingStage(3, "Controlando as Sondas", 3);

  /**
   * Construtor da classe.
   *
   * @param id
   * @param description
   * @param nextStage
   */
  constructor(public id: number, public description: string, public nextStage: number) { }

  /**
   * Retorna a instância de 'TestingStage' conforme o 'id' informado.
   *
   * @param id
   */
  public static findById(id: number): TestingStage {

    switch (id) {
      case 1:
        return TestingStage.SETTING_MESH;

      case 2:
        return TestingStage.SETTING_PROBE;

      case 3:
        return TestingStage.CONTROLLING_PROBE;

      default:
        return undefined;
    }
  }

}

/**
 * Classe de service para controle do 'TestingStage'.
 *
 * @author Gabriel Neres
 */
@Injectable()
export class TestingStageService {

  /**
   * Construtor do service.
   */
  constructor() { }

  /**
   * Valida se o 'TestingStage' informado é igual a 'SETTING_MESH'.
   *
   * @param testingStage
   *
   * @returns boolean
   */
  public isTestingStageSettingMesh(testingStage: TestingStage): boolean {
    return testingStage.id === TestingStage.SETTING_MESH.id;
  }

  /**
   * Valida se o 'TestingStage' informado é igual a 'SETTING_PROBE'.
   *
   * @param testingStage
   *
   * @returns boolean
   */
  public isTestingStageSettingProbe(testingStage: TestingStage): boolean {
    return testingStage.id === TestingStage.SETTING_PROBE.id;
  }

  /**
   * Valida se o 'TestingStage' informado é igual a 'CONTROLLING_PROBE'.
   *
   * @param testingStage
   *
   * @returns boolean
   */
  public isTestingStageControllingProbe(testingStage: TestingStage): boolean {
    return testingStage.id === TestingStage.CONTROLLING_PROBE.id;
  }

  /**
   * Avança o estágio da aplicação com base no estágio atual informado.
   *
   * @param currentTestingStage
   *
   * @returns TestingStage
   */
  public nextStage(currentTestingStage: TestingStage): TestingStage {
    return TestingStage.findById(currentTestingStage.nextStage);
  }

}
