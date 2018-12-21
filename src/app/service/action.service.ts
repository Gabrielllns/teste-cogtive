import { Injectable } from '@angular/core';

/**
 * Classe de mapeamento com as possíves representações de 'Action'.
 *
 * @author Gabriel Neres
 */
export class Action {

  public static NORTH: Action = new Action(1, "Norte");
  public static SOUTH: Action = new Action(2, "Sul");
  public static EAST: Action = new Action(3, "Leste");
  public static WEST: Action = new Action(4, "Oeste");

  /**
   * Construtor da classe.
   *
   * @param id
   * @param description
   */
  constructor(public id: number, public description: string) { }

  /**
   * Retorna a instância de 'Action' conforme o 'id' informado.
   *
   * @param id
   */
  public static findById(id: number): Action {

    switch (id) {
      case 1:
        return Action.NORTH;
      case 2:
        return Action.SOUTH;
      case 3:
        return Action.EAST;
      case 4:
        return Action.WEST;
      default:
        return undefined;
    }
  }
}

/**
 * Classe de service para controle do 'Action'.
 *
 * @author Gabriel Neres
 */
@Injectable()
export class ActionService {

  /**
   * Construtor do service.
   */
  constructor() { }

  /**
   * Valida se o 'Action' informado é igual a 'NORTH'.
   *
   * @param action
   *
   * @returns boolean
   */
  public isActionNorth(action: Action): boolean {
    return action.id === Action.NORTH.id;
  }

  /**
   * Valida se o 'Action' informado é igual a 'SOUTH'.
   *
   * @param action
   *
   * @returns boolean
   */
  public isActionSouth(action: Action): boolean {
    return action.id === Action.SOUTH.id;
  }

  /**
   * Valida se o 'Action' informado é igual a 'EAST'.
   *
   * @param action
   *
   * @returns boolean
   */
  public isActionEast(action: Action): boolean {
    return action.id === Action.EAST.id;
  }

  /**
   * Valida se o 'Action' informado é igual a 'WEST'.
   *
   * @param action
   *
   * @returns boolean
   */
  public isActionWest(action: Action): boolean {
    return action.id === Action.WEST.id;
  }

}
