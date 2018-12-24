import { Injectable } from '@angular/core';

import { MeshConfiguration } from '../interface/mesh-configuration-interface';

/**
 * Classe de mapeamento com as possíves representações de 'Situation'.
 *
 * @author Gabriel Neres
 */
export class Situation {

  public static HASNT_PROBE: Situation = new Situation(1, "Sem Sonda", "bg-danger");
  public static HAS_PROBE: Situation = new Situation(2, "Com Sonda", "bg-danger");

  /**
   * Construtor da classe.
   *
   * @param id
   * @param description
   * @param style
   */
  constructor(public id: number, public description: string, public style: string) { }

  /**
   * Retorna a instância de 'Situation' conforme o 'id' informado.
   *
   * @param id
   *
   * @returns Situation
   */
  public static findById(id: number): Situation {

    switch (id) {
      case 1:
        return Situation.HASNT_PROBE;
      case 2:
        return Situation.HAS_PROBE;
      default:
        return undefined;
    }
  }
}

/**
 * Classe de service para controle do 'Mesh'.
 *
 * @author Gabriel Neres
 */
@Injectable()
export class MeshService {

  /**
   * Construtor do service.
   */
  constructor() { }

  /**
   * Gera o array de índices da malha conforme os parâmetros
   *
   * @param meshConfigurations
   *
   * @returns any
   */
  public generateArrayMesh(meshConfigurations: MeshConfiguration): any {
    let meshGroup = {
      'lines': [],
      'columns': []
    };

    for (let x = meshConfigurations.finishSizeX; x >= meshConfigurations.initialX; x--) {
      meshGroup.lines.push(this.getItem(Situation.HASNT_PROBE, x, undefined));
    }

    for (let y = meshConfigurations.initialY; y <= meshConfigurations.finishSizeY; y++) {
      meshGroup.columns.push(this.getItem(Situation.HASNT_PROBE, undefined, y));
    }

    return meshGroup;
  }

  /**
   * Retorna um novo objeto com ad configurações de linha/coluna.
   *
   * @param situation
   * @param x
   * @param y
   *
   * @returns any
   */
  private getItem(situation: Situation, x: number, y: number): any {

    return {
      'situation': situation,
      'hasProbe': false,
      'indexProbe': undefined,
      'x': x,
      'y': y
    };
  }

}
