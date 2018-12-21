import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ProbeControl } from './interface/probe-control-interface';
import { MeshConfiguration } from './interface/mesh-configuration-interface';

import { MessageService } from './service/message.service';
import { TestingStageService, TestingStage } from './service/testing-stage.service';

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
   * @param testingStageService
   */
  constructor(private testingStageService: TestingStageService) {

    this.meshConfigurations = {
      testingStage: TestingStage.SETTING_MESH
    };

    this.probes.push(this.firstProbe);
    this.probes.push(this.secondProbe);

    console.log(this.probes);
  }

  /**
   * Valida se o 'TestingStage' informado é igual a 'SETTING_MESH'.
   *
   * @param testingStage
   *
   * @returns boolean
   */
  public isTestingStageSettingMesh(testingStage: TestingStage): boolean {
    return this.testingStageService.isTestingStageSettingMesh(testingStage);
  }

  /**
   * Valida se o 'TestingStage' informado é igual a 'SETTING_PROBE'.
   *
   * @param testingStage
   *
   * @returns boolean
   */
  public isTestingStageSettingProbe(testingStage: TestingStage): boolean {
    return this.testingStageService.isTestingStageSettingProbe(testingStage);
  }

  /**
   * Valida se o 'TestingStage' informado é igual a 'CONTROLLING_PROBE'.
   *
   * @param testingStage
   *
   * @returns boolean
   */
  public isTestingStageControllingProbe(testingStage: TestingStage): boolean {
    return this.testingStageService.isTestingStageControllingProbe(testingStage);
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
        this.nextStage(meshConfigurations.testingStage);
      } else {
        console.error(MessageService.MSG_ERROR_MESH_MEASURES_EQUALS);
      }
    }
  }

  /**
   * Avança o estágio da aplicação com base no estágio atual informado.
   *
   * @param testingStage
   *
   * @returns void
   */
  private nextStage(testingStage: TestingStage): void {
    this.meshConfigurations.testingStage = this.testingStageService.nextStage(testingStage);
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
