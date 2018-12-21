import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ProbeControl } from './interface/probe-control-interface';
import { MeshConfiguration } from './interface/mesh-configuration-interface';

import { MessageService } from './service/message.service';
import { StageService, Stage } from './service/stage.service';

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

  public probes: any[] = [];
  public firstProbe: ProbeControl = {};
  public secondProbe: ProbeControl = {};
  public meshConfigurations: MeshConfiguration;

  /**
   * Construtor do componente.
   *
   * @param stageService
   */
  constructor(private stageService: StageService) {

    this.meshConfigurations = {
      stage: Stage.SETTING_MESH
    };

    this.probes.push(this.firstProbe);
    this.probes.push(this.secondProbe);

    console.log(this.probes);
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
        this.nextStage(meshConfigurations.stage);
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
   * Valida se os valores da 'Malha' informada formam uma 'matriz quadrada'.
   *
   * @param meshConfigurations
   *
   * @returns boolean
   */
  private isSquareMatrix(meshConfigurations: MeshConfiguration): boolean {
    return Number(meshConfigurations.inputMeshSizeX) === Number(meshConfigurations.inputMeshSizeY);
  }

}
