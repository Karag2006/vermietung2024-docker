import { useState } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";
import { Actions } from "@/types";
import { TrailerPrice } from "@/types/price";
import { TrailerRow } from "./trailer-row";

declare module "@tanstack/react-table" {
    type TData = TrailerPrice;
    interface CellContext<TData, TValue> {
        actions: Actions;
    }
}
interface TrailerPriceTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    actions: Actions;
    queryParams?: any;
}

export function TrailerPriceTable<TData, TValue>({
    columns,
    data,
    actions,
    queryParams,
}: TrailerPriceTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = useState({
        selector: false,
        loading_size: false,
        totalWeight: false,
        usableWeight: false,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        enableRowSelection: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
        },
    });

    return (
        <div>
            <DataTableToolbar table={table} queryParams={queryParams} />
            <div className="rounded-md border mb-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TrailerRow
                                    key={row.id}
                                    // @ts-ignore
                                    row={row}
                                    actions={actions}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    );
}
