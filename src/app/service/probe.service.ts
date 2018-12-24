import { Injectable } from '@angular/core';

import { Action } from './action.service';

/**
 * Classe de service para controle do 'Probe'.
 *
 * @author Gabriel Neres
 */
@Injectable()
export class ProbeService {

  /**
   * Construtor do service.
   */
  constructor() { }

  /**
   * Retorna o array de possíveis movimentos e suas configurações.
   */
  public getMoves(): any {

    return {
      'L': {
        'N': {
          'newDirection': Action.WEST.id
        },
        'S': {
          'newDirection': Action.EAST.id
        },
        'E': {
          'newDirection': Action.NORTH.id
        },
        'W': {
          'newDirection': Action.SOUTH.id
        },
      },
      'R': {
        'N': {
          'newDirection': Action.EAST.id
        },
        'S': {
          'newDirection': Action.WEST.id
        },
        'E': {
          'newDirection': Action.SOUTH.id
        },
        'W': {
          'newDirection': Action.NORTH.id
        },
      },
      'M': {
        'N': {
          'line': 0,
          'column': 1
        },
        'S': {
          'line': 0,
          'column': -1
        },
        'E': {
          'line': 1,
          'column': 0
        },
        'W': {
          'line': -1,
          'column': 0
        },
      }
    };
  }

}
