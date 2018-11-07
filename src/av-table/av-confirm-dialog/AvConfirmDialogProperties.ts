import {AvConfirmDialogType} from './AvConfirmDialogType';

export class AvConfirmDialogProperties {
  public message: string;

  constructor(readonly title: string, readonly type?: AvConfirmDialogType) {}
}
