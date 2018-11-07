import {AvTransactionType} from './AvTransactionType';
import {AvTransactionStateType} from './AvTransactionStateType';

export class AvTableTransactionState {

constructor (private _type: AvTransactionType, private _state: AvTransactionStateType,
             private _message?: string, private _refresh?: boolean) {}

  get state(): AvTransactionStateType {
    return this._state;
  }

  set state(value: AvTransactionStateType) {
    this._state = value;
  }

  get message(): string {
  if (this._message) {
    return this._message;
  };

  return '';
  }

  set message(value: string) {
    this._message = value;
  }

  get type(): AvTransactionType {
    return this._type;
  }

  set type(value: AvTransactionType) {
    this._type = value;
  }

  get refresh(): boolean {
  if (this._refresh) {
    return this._refresh;
  }
  return false;
  }

  set refresh(value: boolean) {
    this._refresh = value;
  }
}
