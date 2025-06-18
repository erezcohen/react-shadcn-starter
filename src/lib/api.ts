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
    id: "Device-001",
    model: "Galaxy S21",
    osVersion: "Android 12",
    status: "connected",
    dataCenter: "DC-West",
  },
  {
    id: "Device-002",
    model: "iPhone 13 Pro",
    osVersion: "iOS 15.4",
    status: "connected",
    dataCenter: "DC-East",
  },
  {
    id: "Device-003",
    model: "Pixel 6",
    osVersion: "Android 13",
    status: "disconnected",
    dataCenter: "DC-Central",
  },
  {
    id: "Device-004",
    model: "Galaxy S20",
    osVersion: "Android 11",
    status: "connected",
    dataCenter: "DC-West",
  },
  {
    id: "Device-005",
    model: "iPhone 12",
    osVersion: "iOS 14.8",
    status: "disconnected",
    dataCenter: "DC-East",
  },
  {
    id: "Device-006",
    model: "Pixel 5a",
    osVersion: "Android 12",
    status: "connected",
    dataCenter: "DC-Central",
  },
  {
    id: "Device-007",
    model: "Galaxy S10",
    osVersion: "Android 10",
    status: "disconnected",
    dataCenter: "DC-West",
  },
  {
    id: "Device-008",
    model: "iPhone 11",
    osVersion: "iOS 13.7",
    status: "connected",
    dataCenter: "DC-East",
  },
  {
    id: "Device-009",
    model: "Pixel 4a",
    osVersion: "Android 11",
    status: "disconnected",
    dataCenter: "DC-Central",
  },
  {
    id: "Device-010",
    model: "Galaxy S9",
    osVersion: "Android 9",
    status: "connected",
    dataCenter: "DC-West",
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
      ? mockDevices.filter((device) => device.dataCenter === dataCenterId)
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
