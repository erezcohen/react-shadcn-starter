import { DataCenter, Device, ApiResponse } from "./types";

// Mock data
const mockDataCenters: DataCenter[] = [
  {
    id: "dc1",
    location: "New York",
    type: "On-Premise",
    ipRange: "192.168.1.0/24",
    description: "Main data center",
  },
  {
    id: "dc2",
    location: "Los Angeles",
    type: "Cloud",
    ipRange: "10.0.0.0/16",
    description: "Cloud data center",
  },
  {
    id: "dc3",
    location: "Chicago",
    type: "On-Premise",
    ipRange: "172.16.0.0/20",
    description: "Secondary data center",
  },
  {
    id: "dc4",
    location: "London",
    type: "Cloud",
    ipRange: "10.1.0.0/16",
    description: "International cloud data center",
  },
  {
    id: "dc5",
    location: "Tokyo",
    type: "On-Premise",
    ipRange: "192.168.2.0/24",
    description: "Asia data center",
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
