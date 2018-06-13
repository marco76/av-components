export class AvFormElement<T> {
  value: T;
  label: string;
  controlType: string;

  constructor(options: {value?: T, label?: string, controlType?: string} = {}) {
    if (options.value) {
      this.value = options.value;
    }
    if (options.label) {
      this.label = options.label;
      }

      if (options.controlType) {
        this.controlType = options.controlType;
      }

  }
}
