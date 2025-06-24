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
import { Loader2, X as XIcon } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";

const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <span className="font-['Inter'] text-[14px] leading-[21px] text-[#0D0F1C]">
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
        <span className="font-['Inter'] text-[14px] leading-[21px] text-[#47579E]">
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
        <span className="font-['Inter'] text-[14px] leading-[21px] text-[#47579E]">
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
        <div className="flex items-center justify-start">
          <span className="bg-[#E5E8F5] rounded-lg px-4 py-1 text-[14px] font-medium text-[#0D0F1C]">
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dataCenter",
    header: "Data Center",
    cell: ({ row }) => {
      const dataCenter = row.getValue("dataCenter") as string;
      return (
        <span className="font-['Inter'] text-[14px] leading-[21px] text-[#47579E]">
          {dataCenter}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <span className="font-['Inter'] font-bold text-[14px] leading-[21px] text-[#47579E]">
        Actions
      </span>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isConnected = status === "connected";
      return (
        <button
          className="font-bold text-[14px] text-[#47579E]"
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
    <div className="bg-[#F7FAFC] min-h-screen">
      <div className="max-w-[960px] mx-auto px-10 py-5">
        <div className="mb-4">
          <h1 className="text-[32px] font-bold text-[#0D0F1C] leading-[40px]">
            Devices
          </h1>
        </div>
        <div className="mb-3">
          <div className="relative">
            <SearchInput
              placeholder="Search Devices"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#E5E8EB] rounded-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <XIcon className="h-4 w-4 text-[#565A6F]" />
              </button>
            )}
          </div>
        </div>
        <div className="bg-[#F7FAFC] rounded-lg border border-[#CFD1E8] overflow-hidden">
          <Table className="overflow-hidden">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-[#E5E8EB]"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-[#F7FAFC] h-[48px] text-[14px] font-bold text-[#0D0F1C] px-4 first:rounded-tl-lg last:rounded-tr-lg"
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
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    className="h-[72px] border-t border-[#E5E8EB]"
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell
                        key={cell.id}
                        className={`px-4 ${
                          rowIndex === table.getRowModel().rows.length - 1
                            ? cellIndex === 0
                              ? "rounded-bl-lg"
                              : cellIndex === row.getVisibleCells().length - 1
                              ? "rounded-br-lg"
                              : ""
                            : ""
                        }`}
                      >
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
                    className="h-24 text-center rounded-b-lg"
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
