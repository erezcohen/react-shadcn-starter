import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataCenter } from "@/lib/types";
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

const columns: ColumnDef<DataCenter>[] = [
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.getValue("location") as string;
      return (
        <span className="font-['Inter:Regular',_sans-serif] text-[14px] leading-[21px] text-[#0D0F1C]">
          {location}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <span className="font-['Inter:Regular',_sans-serif] text-[14px] leading-[21px] text-[#47579E]">
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "ipRange",
    header: "IP Range",
    cell: ({ row }) => {
      const ipRange = row.getValue("ipRange") as string;
      return (
        <span className="font-['Inter:Regular',_sans-serif] text-[14px] leading-[21px] text-[#47579E]">
          {ipRange}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <span className="font-['Inter:Regular',_sans-serif] text-[14px] leading-[21px] text-[#47579E]">
          {description}
        </span>
      );
    },
  },
];

export default function DataCenters() {
  const { data: dataCenters, isLoading } = useQuery({
    queryKey: ["dataCenters"],
    queryFn: async () => {
      const response = await api.getDataCenters();
      return response.data;
    },
  });

  const table = useReactTable({
    data: dataCenters || [],
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
          <h1 className="text-[24px] font-bold text-[#0D0F1C]">Data Centers</h1>
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
                    No data centers found.
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
