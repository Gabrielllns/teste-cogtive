/**
 * Service responsável pelas 'Mensagens' da aplicação.
 *
 * @author Gabriel Neres
 */
export class MessageService {

  public static MSG_ERROR_MESH_MEASURES_EQUALS: string = 'As medidas da malha não podem ser iguais!';

  public static MSG_ERROR_FORM_NOT_VALID: string = 'Preencha todos os campos para prosseguir!';

  public static MSG_ERROR_PROBE_COORDINATES_MESH: string = 'A posição da sonda {0} deve estar dentro das coordenadas definidas inicialmente para a malha ({1},{2}).';

  /**
   * Construtor do service.
   */
  constructor() { }

  /**
   * Seta os paraâmetros informados para a mensagem informada.
   *
   * @param message
   * @param parameters
   *
   * @returns string
   */
  public setParameters(message: string, parameters: any): string {
    let newMessage = undefined;

    parameters.forEach((parameter, index) => {
      newMessage = message.replace("{" + index + "}", parameter);
      message = newMessage;
    });

    return newMessage;
  }

}
