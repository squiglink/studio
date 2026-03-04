interface Measurement {
  label: string;
  type: string;
  databaseId: string;
  leftChannel: File[];
  rightChannel: File[];
  errors: string[];
}
