import { TableCell, TableRow } from "@/Components/ui/table";
import { LoadingSizeDisplay } from "@/Pages/Trailer/components/loading-size-display";
import { WeightDisplay } from "@/Pages/Trailer/components/weight-display";
import { TrailerPrice } from "@/types/price";
import { flexRender, Row } from "@tanstack/react-table";

interface RowProps {
    row: Row<TrailerPrice>;
    actions: any;
}

export const TrailerRow = ({ row, actions }: RowProps) => {
    return (
        <>
            <tr key={row.id + " 1"}>
                <td colSpan={2} className="p-4 font-bold">
                    {
                        //  @ts-ignore
                        row.original.selector
                    }
                </td>
                <td className="p-2">
                    <LoadingSizeDisplay
                        loadingSize={
                            row.original.loading_size
                                ? JSON.stringify(row.original.loading_size)
                                : ""
                        }
                    />
                </td>
                <td className="p-2">
                    <WeightDisplay
                        weight={
                            row.original.totalWeight
                                ? row.original.totalWeight + ""
                                : ""
                        }
                        unit="kg"
                    />
                </td>
                <td className="p-2">
                    <WeightDisplay
                        weight={
                            row.original.usableWeight
                                ? row.original.usableWeight + ""
                                : ""
                        }
                        unit="kg"
                    />
                </td>
            </tr>
            <TableRow
                key={row.id + " 2"}
                data-state={row.getIsSelected() && "selected"}
            >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, {
                            ...cell.getContext(),
                            actions,
                        })}
                    </TableCell>
                ))}
            </TableRow>
        </>
    );
};
