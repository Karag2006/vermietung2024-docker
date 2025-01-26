import {
    ColumnDef,
    CellContext as TanCellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/data-table/column-header";
import { Price, TrailerPrice } from "@/types/price";
import { ListActions } from "@/Components/Actions/ListActions";
import { CurrencyDisplay } from "./components/currencyDisplay";
import { PriceListSelector } from "./components/price-list-selector";

export const trailerColumns: ColumnDef<TrailerPrice>[] = [
    {
        header: "ID",
        accessorKey: "selector",
        id: "selector",
        enableHiding: true,
    },
    {
        header: "ID",
        accessorKey: "loading_size",
        id: "loading_size",
        enableHiding: true,
    },
    {
        header: "ID",
        accessorKey: "totalWeight",
        id: "totalWeight",
        enableHiding: true,
    },
    {
        header: "ID",
        accessorKey: "usableWeight",
        id: "usableWeight",
        enableHiding: true,
    },
    {
        accessorKey: "price.id",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Preisliste" />;
        },
        id: "price.id",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <PriceListSelector
                        currentPriceList={cell.row.original.price?.id}
                        trailerId={
                            cell.row.original.id ? cell.row.original.id : 0
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "price.stunden5",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="5 Stunden" />
                </div>
            );
        },
        id: "price.stunden5",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.price?.stunden5
                                ? cell.row.original.price?.stunden5
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "price.tag1",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="1 Tag" />
                </div>
            );
        },
        id: "price.tag1",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.price?.tag1
                                ? cell.row.original.price?.tag1
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "price.wochenende",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="Wochenende" />
                </div>
            );
        },
        id: "price.wochenende",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.price?.wochenende
                                ? cell.row.original.price?.wochenende
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "price.wochen1",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="1 Woche" />
                </div>
            );
        },
        id: "price.wochen1",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.price?.wochen1
                                ? cell.row.original.price?.wochen1
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "price.wochen2",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="2 Wochen" />
                </div>
            );
        },
        id: "price.wochen2",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.price?.wochen2
                                ? cell.row.original.price?.wochen2
                                : null
                        }
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "price.wochen3",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <DataTableColumnHeader column={column} title="3 Wochen" />
                </div>
            );
        },
        id: "price.wochen3",
        cell: (cell) => {
            return (
                <div className="flex justify-center">
                    <CurrencyDisplay
                        amount={
                            cell.row.original.price?.wochen3
                                ? cell.row.original.price.wochen3
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
