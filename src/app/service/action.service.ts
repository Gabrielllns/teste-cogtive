import { Injectable } from '@angular/core';

/**
 * Classe de mapeamento com as possíves representações de 'Action'.
 *
 * @author Gabriel Neres
 */
export class Action {

  public static NORTH: Action = new Action(1, "Norte", "N");
  public static SOUTH: Action = new Action(2, "Sul", "S");
  public static EAST: Action = new Action(3, "Leste", "E");
  public static WEST: Action = new Action(4, "Oeste", "O");
  public static MOVE: Action = new Action(5, "Movimentar", "M");

  /**
   * Construtor da classe.
   *
   * @param id
   * @param description
   * @param key
   */
  constructor(public id: number, public description: string, public key: string) { }

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
      case 5:
        return Action.MOVE;
      default:
        return undefined;
    }
  }

  /**
   * Retorna a instância de 'Action' conforme o 'key' informada.
   *
   * @param id
   */
  public static findByKey(key: string): Action {

    switch (key) {
      case 'N':
        return Action.NORTH;
      case 'S':
        return Action.SOUTH;
      case 'E':
        return Action.EAST;
      case 'W':
        return Action.WEST;
      case 'M':
        return Action.MOVE;
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

  /**
   * Valida se o 'Action' informado é igual a 'MOVE'.
   *
   * @param action
   *
   * @returns boolean
   */
  public isActionMove(action: Action): boolean {
    return action.id === Action.MOVE.id;
  }

  /**
   * Retorna as direções possíveis para a 'Sonda'.
   *
   * @returns Action[]
   */
  public getDirections(): Action[] {
    let directions: Action[] = [];

    directions.push(Action.NORTH);
    directions.push(Action.SOUTH);
    directions.push(Action.EAST);
    directions.push(Action.WEST);

    return directions;
  }

}
