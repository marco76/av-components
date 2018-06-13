import {AvFormElement} from './AvFormElement';

export class AvFormText extends AvFormElement<string> {
  controlType = 'textbox';
  type: string;

  constructor(options:  {} = {}) {
    super(options);
    if (options['type']) {
      this.type = options['type'] || '';
    }
  }
}
