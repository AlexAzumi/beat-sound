export default interface IpcArgs {
  /**
   * Name of the action to execute
   */
  action: string;
  /**
   * Extra information needed to execute the action
   */
  payload: object | null;
}
