import { DataCenter, Device, ApiResponse } from "./types";

// Mock data
const mockDataCenters: DataCenter[] = [
  {
    id: "dc1",
    name: "US East Data Center",
    location: "Virginia, USA",
    status: "active",
    deviceCount: 150,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "dc2",
    name: "EU West Data Center",
    location: "Dublin, Ireland",
    status: "maintenance",
    deviceCount: 120,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "dc3",
    name: "Asia Pacific Data Center",
    location: "Singapore",
    status: "active",
    deviceCount: 200,
    lastUpdated: new Date().toISOString(),
  },
];

const mockDevices: Device[] = [
  {
    id: "dev1",
    name: "Main Server 01",
    type: "server",
    status: "online",
    dataCenterId: "dc1",
    ipAddress: "192.168.1.100",
    lastPing: new Date().toISOString(),
  },
  {
    id: "dev2",
    name: "Storage Array 01",
    type: "storage",
    status: "warning",
    dataCenterId: "dc1",
    ipAddress: "192.168.1.101",
    lastPing: new Date().toISOString(),
  },
  {
    id: "dev3",
    name: "Network Switch 01",
    type: "network",
    status: "online",
    dataCenterId: "dc2",
    ipAddress: "192.168.2.100",
    lastPing: new Date().toISOString(),
  },
];

// API client
const api = {
  getDataCenters: async (): Promise<ApiResponse<DataCenter[]>> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { data: mockDataCenters };
  },

  getDevices: async (dataCenterId?: string): Promise<ApiResponse<Device[]>> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const devices = dataCenterId
      ? mockDevices.filter((device) => device.dataCenterId === dataCenterId)
      : mockDevices;
    return { data: devices };
  },

  getDataCenter: async (
    id: string
  ): Promise<ApiResponse<DataCenter | null>> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const dataCenter = mockDataCenters.find((dc) => dc.id === id);
    if (!dataCenter) {
      return { data: null, error: "Data center not found" };
    }
    return { data: dataCenter };
  },
};

export default api;
