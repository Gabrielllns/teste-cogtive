import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ProbeControl } from './interface/probe-control-interface';
import { MeshConfiguration } from './interface/mesh-configuration-interface';

import { ProbeService } from './service/probe.service';
import { MessageService } from './service/message.service';
import { StageService, Stage } from './service/stage.service';
import { MeshService, Situation } from './service/mesh.service';
import { ActionService, Action } from './service/action.service';

/**
 * Component responsável pelas lógicas de controle do componente 'App'.
 *
 * @author Gabriel Neres
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public meshGroup: any;
  public directions: Action[];
  public historyFisrtProbe: any[] = [];
  public historySecondProbe: any[] = [];
  public probesConfigurations: any[] = [];
  public meshConfigurations: MeshConfiguration;
  public firstProbe: ProbeControl = { 'id': 1 };
  public secondProbe: ProbeControl = { 'id': 2 };

  /**
   * Construtor do componente.
   *
   * @param probeService
   * @param stageService
   * @param actionService
   * @param messageService
   */
  constructor(private probeService: ProbeService, private stageService: StageService, private actionService: ActionService, private messageService: MessageService, private meshService: MeshService) {
    this.directions = this.actionService.getDirections();

    this.meshConfigurations = {
      initialX: 0,
      initialY: 0,
      stage: Stage.SETTING_MESH,
    };

    this.probesConfigurations.push(this.firstProbe);
    this.probesConfigurations.push(this.secondProbe);
  }

  /**
   * Valida se o 'Stage' informado é igual a 'SETTING_MESH'.
   *
   * @param stage
   *
   * @returns boolean
   */
  public isStageSettingMesh(stage: Stage): boolean {
    return this.stageService.isStageSettingMesh(stage);
  }

  /**
   * Valida se o 'Stage' informado é igual a 'SETTING_PROBE'.
   *
   * @param stage
   *
   * @returns boolean
   */
  public isStageSettingProbe(stage: Stage): boolean {
    return this.stageService.isStageSettingProbe(stage);
  }

  /**
   * Valida se o 'Stage' informado é igual a 'CONTROLLING_PROBE'.
   *
   * @param stage
   *
   * @returns boolean
   */
  public isStageControllingProbe(stage: Stage): boolean {
    return this.stageService.isStageControllingProbe(stage);
  }

  /**
   * Valida se o 'Stage' informado é igual a 'SIMULATION'.
   *
   * @param stage
   *
   * @returns boolean
   */
  public isStageSimulation(stage: Stage): boolean {
    return this.stageService.isStageSimulation(stage);
  }

  /**
   * Inicializa as configurações iniciais da 'Malha'.
   *
   * @param formMesh
   * @param meshConfigurations
   *
   * @returns void
   */
  public initMesh(formMesh: FormControl, meshConfigurations: MeshConfiguration): void {

    if (formMesh.valid) {

      if (!this.isSquareMatrix(meshConfigurations)) {
        this.meshConfigurations.finishSizeX = Number(this.meshConfigurations.finishSizeX);
        this.meshConfigurations.finishSizeY = Number(this.meshConfigurations.finishSizeY);

        this.nextStage(this.meshConfigurations.stage);
      } else {
        console.error(MessageService.MSG_ERROR_MESH_MEASURES_EQUALS);
      }
    }
  }

  /**
   * Avança o estágio da aplicação com base no estágio atual informado.
   *
   * @param stage
   *
   * @returns void
   */
  private nextStage(stage: Stage): void {
    this.meshConfigurations.stage = this.stageService.nextStage(stage);
  }

  /**
   * Inicializa as configurações iniciais das 'Sondas'.
   *
   * @param formProbes
   * @param probesConfigurations
   *
   * @returns void
   */
  public initProbes(formProbes: FormControl, probesConfigurations: ProbeControl[]): void {

    if (formProbes.valid) {

      if (this.isValidPositions(probesConfigurations)) {
        this.nextStage(this.meshConfigurations.stage);
      }
    }
  }

  /**
   * Valida se as posições iniciais definidas para cada uma das sondas se encontram dentro dos limites definidos para a 'Malha'.
   *
   * @param probesConfigurations
   */
  private isValidPositions(probesConfigurations: ProbeControl[]): boolean {
    let countErrors = 0;
    let parameters = [];

    probesConfigurations.forEach((probe, index) => {
      let isValidPositionX = Number(this.meshConfigurations.finishSizeX) >= Number(probe.initialPositionX);
      let isValidPositionY = Number(this.meshConfigurations.finishSizeY) >= Number(probe.initialPositionY);

      probe.initialPositionX = Number(probe.initialPositionX);
      probe.initialPositionY = Number(probe.initialPositionY);
      probe.initialDirection = Number(probe.initialDirection);

      probe.currentPositionX = probe.initialPositionX;
      probe.currentPositionY = probe.initialPositionY;
      probe.currentDirection = probe.initialDirection;

      if (!(isValidPositionX && isValidPositionY)) {
        ++countErrors;

        parameters.push(Number(index + 1));
        parameters.push(Number(this.meshConfigurations.finishSizeX));
        parameters.push(Number(this.meshConfigurations.finishSizeY));

        console.error(this.messageService.setParameters(MessageService.MSG_ERROR_PROBE_COORDINATES_MESH, parameters));
      }
    });

    return (countErrors === 0);
  }

  /**
   * Da início ao processamento da simulação.
   *
   * @param formControlProbes
   * @param probesConfigurations
   */
  public startSimulation(formControlProbes: FormControl, probesConfigurations: ProbeControl[]): void {

    if (formControlProbes.valid) {
      this.meshGroup = this.meshService.generateArrayMesh(this.meshConfigurations);

      this.nextStage(this.meshConfigurations.stage);

      this.setProbesInMesh(this.meshGroup, probesConfigurations).subscribe(() => {
        this.simulate(probesConfigurations);
      });
    }
  }

  /**
   * Simula as novas ações de cada uma das 'Sondas'.
   *
   * @param probesConfigurations
   */
  private simulate(probesConfigurations: ProbeControl[]): void {
    let moves = this.probeService.getMoves(); // Recupera a lista de movimentos possíveis.

    probesConfigurations.forEach((probe) => {
      let listCommands = probe.listCommands; // Recupera a lista de comandos.

      for (let i = 0; i <= listCommands.length; i++) { // Lê cada um dos caracteres.

        Object.keys(moves).forEach(moveKey => { // Percorre os sentidos dos movimentos.
          let comand = listCommands.charAt(i);

          if (moveKey === comand) { // Compara as KEYS.
            let movesDirection = moves[moveKey]; // Movimentos possíveis.
            let newDirection = Action.findByKey(moveKey); // Retorna a nova direção sugerida.
            let currentDirectionTO = Action.findById(probe.currentDirection); // Direção atual.

            Object.keys(movesDirection).forEach(directionKey => {  // Percorre a posição atual da 'sonda'.

              if (currentDirectionTO.key === directionKey) { // Compara as direções.
                let moveDirectionTO = movesDirection[directionKey];

                if (this.actionService.isActionMove(newDirection)) {
                  probe.currentPositionX += moveDirectionTO.line;
                  probe.currentPositionY += moveDirectionTO.column;
                } else {
                  probe.currentDirection = moveDirectionTO.newDirection;
                }

                this.setNewHistoryComand(probe, newDirection);
              }
            });
          }
        });
      }
    });
  }

  /**
   * Seta um novo item no histórico.
   *
   * @param probe
   * @param newDirection
   */
  private setNewHistoryComand(probe: ProbeControl, newDirection: Action): void {
    let history = probe.currentPositionX + ' - ' + probe.currentPositionY + ' - ' + Action.findById(probe.currentDirection).key + ' -> ' + newDirection.key;
    (probe.id === 1) ? this.historyFisrtProbe.push(history) : this.historySecondProbe.push(history);
  }

  /**
   * Seta as posições das 'Sondas' na 'Malha'.
   *
   * @param meshGroup
   * @param probesConfigurations
   */
  private setProbesInMesh(meshGroup: any, probesConfigurations: ProbeControl[]): Observable<void> {

    return new Observable(observer => {

      probesConfigurations.forEach((probe, index) => {
        let indexLine = ((meshGroup.lines.length - 1) - probe.initialPositionX);

        meshGroup.lines[indexLine].hasProbe = true;
        meshGroup.lines[indexLine].indexProbe = index;

        meshGroup.columns[probe.initialPositionY].hasProbe = true;
        meshGroup.columns[probe.initialPositionY].indexProbe = index;
        meshGroup.columns[probe.initialPositionY].situation = Situation.HAS_PROBE;

        if (index === (probesConfigurations.length - 1)) {
          observer.next();
          observer.complete();
        }
      });
    });
  }

  /**
   * Valida se os valores da 'Malha' informada formam uma 'matriz quadrada'.
   *
   * @param meshConfigurations
   *
   * @returns boolean
   */
  private isSquareMatrix(meshConfigurations: MeshConfiguration): boolean {
    return Number(meshConfigurations.finishSizeX) === Number(meshConfigurations.finishSizeY);
  }

  /**
   * Processa o 'valor' informado colocando-o no padrão definido (apenas string e em caixa alta).
   *
   * @param probe
   */
  public processText(probe: ProbeControl): void {
    probe.listCommands = probe.listCommands.replace(/\d/g, ""); // Remove o que não for letra.
    probe.listCommands = probe.listCommands.toUpperCase().trim(); // Coloca os termos em caixa alta e remove os espaços.
  }

  /**
   * Retorna o estilo conforme a linha e a coluna informada.
   *
   * @param line
   * @param column
   */
  public getStyleMesh(line: any, column: any): string {
    return (line.hasProbe && column.hasProbe && line.indexProbe === column.indexProbe) ? 'bg-info' : 'bg-danger';
  }

  /**
   * Valida se existe 'Sonda' na posição da 'Malha' informada.
   *
   * @param line
   * @param column
   */
  public hasProbeInMesh(line: any, column: any): boolean {
    return line.indexProbe !== undefined && column.indexProbe !== undefined && line.indexProbe === column.indexProbe;
  }

  /**
   * Retorna a descrição da direção conforme os parâmetros informados.
   *
   * @param initialDirection
   */
  public getActionDirectionProbe(initialDirection: number): string {
    return Action.findById(initialDirection).key;
  }

}
