export default interface Download {
  name: string;
  percent: number;
  lastFile?: string;
  files: {
    downloaded: number;
    total: number;
  };
  size: {
    downloaded: number;
    total: number;
  };
}
