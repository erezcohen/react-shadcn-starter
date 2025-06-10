export type DataCenter = {
  id: string;
  name: string;
  location: string;
  status: "active" | "maintenance" | "offline";
  deviceCount: number;
  lastUpdated: string;
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
