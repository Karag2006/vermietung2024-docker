import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";
import { Price } from "@/types/price";
import { ListActions } from "@/Components/Actions/ListActions";
import { CurrencyDisplay } from "./components/currencyDisplay";

export const columns: ColumnDef<Price>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Name" />;
        },
    },
    {
        accessorKey: "stunden5",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="5 Stunden" />
                </div>
            );
        },
        id: "stunden5",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.stunden5
                                ? cell.row.original.stunden5
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "tag1",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="1 Tag" />
                </div>
            );
        },
        id: "tag1",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.tag1
                                ? cell.row.original.tag1
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "wochenende",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="Wochenende" />
                </div>
            );
        },
        id: "wochenende",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.wochenende
                                ? cell.row.original.wochenende
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "wochen1",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="1 Woche" />
                </div>
            );
        },
        id: "wochen1",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.wochen1
                                ? cell.row.original.wochen1
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "wochen2",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="2 Wochen" />
                </div>
            );
        },
        id: "wochen2",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.wochen2
                                ? cell.row.original.wochen2
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "wochen3",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="3 Wochen" />
                </div>
            );
        },
        id: "wochen3",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.wochen3
                                ? cell.row.original.wochen3
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: (cell) => {
            return (
                <ListActions
                    actions={cell.actions}
                    id={cell.row.original.id ? cell.row.original.id : 0}
                />
            );
        },
    },
];
