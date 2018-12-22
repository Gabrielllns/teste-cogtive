import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ProbeControl } from './interface/probe-control-interface';
import { MeshConfiguration } from './interface/mesh-configuration-interface';

import { MessageService } from './service/message.service';
import { StageService, Stage } from './service/stage.service';
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

  public directions: Action[];
  public firstProbe: ProbeControl = {};
  public secondProbe: ProbeControl = {};
  public probesConfigurations: any[] = [];
  public meshConfigurations: MeshConfiguration;

  /**
   * Construtor do componente.
   *
   * @param stageService
   * @param actionService
   * @param messageService
   */
  constructor(private stageService: StageService, private actionService: ActionService, private messageService: MessageService) {

    this.meshConfigurations = {
      stage: Stage.SETTING_MESH
    };

    this.directions = this.actionService.getDirections();

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
    let isValidPositions = false;

    probesConfigurations.forEach((probe, index) => {
      let isValidPositionX = Number(this.meshConfigurations.inputMeshSizeX) >= Number(probe.initialPositionX);
      let isValidPositionY = Number(this.meshConfigurations.inputMeshSizeY) >= Number(probe.initialPositionY);

      isValidPositions = (isValidPositionX && isValidPositionY);

      if (!isValidPositions) {
        ++countErrors;

        parameters.push(Number(index + 1));
        parameters.push(Number(this.meshConfigurations.inputMeshSizeX));
        parameters.push(Number(this.meshConfigurations.inputMeshSizeY));

        console.error(this.messageService.setParameters(MessageService.MSG_ERROR_PROBE_COORDINATES_MESH, parameters));
      }
    });

    return (countErrors === 0);
  }

  /**
   *
   *
   * @param formControlProbes
   * @param probesConfigurations
   */
  public startSimulation(formControlProbes: FormControl, probesConfigurations: ProbeControl[]): void {

    if (formControlProbes.valid) {
      console.log(probesConfigurations);
    }
  }

  /**
   * Valida se os valores da 'Malha' informada formam uma 'matriz quadrada'.
   *
   * @param meshConfigurations
   *
   * @returns boolean
   */
  private isSquareMatrix(meshConfigurations: MeshConfiguration): boolean {
    return Number(meshConfigurations.inputMeshSizeX) === Number(meshConfigurations.inputMeshSizeY);
  }

  /**
   * Processa o 'valor' informado colocando-o no padrão definido (apenas string e em caixa alta).
   *
   * @param probe
   */
  public processText(probe: ProbeControl): void {
    probe.listCommands = probe.listCommands.replace(/\d/g, ""); // Remove o que não for letra.
    probe.listCommands = probe.listCommands.toUpperCase(); // Coloca os termos em caixa alta.
  }

}
