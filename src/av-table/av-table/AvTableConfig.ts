/**
 *  This class allows to override at runtime some pre-defined configuration properties of the table.
 *  This allows to change the behaviour of the table according to the application state and external parameters (logged users etc.)
 */

export class AvTableConfig {

  constructor(private _tableEditable = false, private _options?: {_editableStatusReason?: string}) {}

  public get tableEditable(): boolean {
    return this._tableEditable;
  }

  public set tableEditable(value: boolean) {
    this._tableEditable = value;
  }

  get isReadOnly(): boolean {
    return !this._tableEditable;
  }

  get options(): { _editableStatusReason?: string } {
    if (this._options) {
      return this._options;
    }
    return {};
  }

  set options(value: { _editableStatusReason?: string }) {
    this._options = value;
  }

  get editableStatusReason(): string | undefined {
    if (!this._options) {
      return undefined;
    }
    return this._options._editableStatusReason;
  }
}
