import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Device } from "@/lib/types";
import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <span className="font-['Inter:Regular',_sans-serif] text-[14px] leading-[21px] text-[#0D0F1C]">
          {id}
        </span>
      );
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      const model = row.getValue("model") as string;
      return (
        <span className="font-['Inter:Regular',_sans-serif] text-[14px] leading-[21px] text-[#47579E]">
          {model}
        </span>
      );
    },
  },
  {
    accessorKey: "osVersion",
    header: "OS and Version",
    cell: ({ row }) => {
      const osVersion = row.getValue("osVersion") as string;
      return (
        <span className="font-['Inter:Regular',_sans-serif] text-[14px] leading-[21px] text-[#47579E]">
          {osVersion}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isConnected = status === "connected";
      return (
        <span
          className={`inline-block rounded-lg px-4 py-1 text-center text-[14px] font-medium ${
            isConnected
              ? "bg-[#e5e8f5] text-[#0d0f1c]"
              : "bg-[#e5e8f5] text-[#0d0f1c] opacity-60"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      );
    },
  },
  {
    accessorKey: "dataCenter",
    header: "Data Center",
    cell: ({ row }) => {
      const dataCenter = row.getValue("dataCenter") as string;
      return (
        <span className="font-['Inter:Regular',_sans-serif] text-[14px] leading-[21px] text-[#47579E]">
          {dataCenter}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isConnected = status === "connected";
      return (
        <button
          className={`rounded-lg px-4 py-1 text-[14px] font-bold transition-colors ${
            isConnected
              ? "bg-[#47579e] text-white hover:bg-[#2d386b]"
              : "bg-[#e5e8f5] text-[#47579e] hover:bg-[#d1d5db]"
          }`}
          // onClick handler would go here
        >
          {isConnected ? "Disconnect" : "Connect"}
        </button>
      );
    },
  },
];

export default function Devices() {
  const [search, setSearch] = React.useState("");
  const { data: devices, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const response = await api.getDevices();
      return response.data;
    },
  });

  const filteredDevices = React.useMemo(() => {
    if (!devices) return [];
    if (!search.trim()) return devices;
    return devices.filter((device) =>
      [device.id, device.model, device.osVersion, device.dataCenter]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [devices, search]);

  const table = useReactTable({
    data: filteredDevices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] relative w-full min-h-screen p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <h1 className="text-[32px] font-bold text-[#0D0F1C] leading-[40px]">
            Devices
          </h1>
        </div>
        <div className="mb-4">
          <Input
            placeholder="Search Devices"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="bg-white rounded-md border border-[#E5E8EB] overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-[#F7FAFC] h-[48px] text-[14px] font-medium text-[#0D0F1C]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="h-[72px]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No devices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
