export class AVTableActions {

  constructor(private _addRecord = true, private _editableRecord = true, private _deletableRecord = true) {}

  get editableRecord(): boolean {
    return this._editableRecord;
  }

  set editableRecord(value: boolean) {
    this._editableRecord = value;
  }

  get deletableRecord(): boolean {
    return this._deletableRecord;
  }

  set deletableRecord(value: boolean) {
    this._deletableRecord = value;
  }

  get addRecord(): boolean {
    return this._addRecord;
  }

  set addRecord(value: boolean) {
    this._addRecord = value;
  }
}
