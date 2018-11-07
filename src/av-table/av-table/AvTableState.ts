/*
The status is dynamically defined by the application
 */
export class AvTableState {
  editable = true;
  // the table can show the reason of the current status (e.g. 'data not editable')
  editabilityReason?: string;
}
