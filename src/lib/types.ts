export type DataCenter = {
  id: string;
  location: string;
  type: "On-Premise" | "Cloud";
  ipRange: string;
  description: string;
};

export type Device = {
  id: string;
  name: string;
  type: "server" | "storage" | "network";
  status: "online" | "offline" | "warning";
  dataCenterId: string;
  ipAddress: string;
  lastPing: string;
};

export type ApiResponse<T> = {
  data: T;
  error?: string;
};
