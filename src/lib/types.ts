export type DataCenter = {
  id: string;
  location: string;
  type: "On-Premise" | "Cloud";
  ipRange: string;
  description: string;
};

export type Device = {
  id: string;
  model: string;
  osVersion: string;
  status: "connected" | "disconnected";
  dataCenter: string;
};

export type ApiResponse<T> = {
  data: T;
  error?: string;
};
