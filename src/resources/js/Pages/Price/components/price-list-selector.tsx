import { SelectorCombobox } from "@/Components/selector-combobox";
import {
    getPricelistById,
    getPriceSelectors,
    switchTrailerPricelist,
} from "@/data/price";
import { PickerReturn } from "@/types";
import { Price, PriceSelector } from "@/types/price";
import { set } from "date-fns";
import { useEffect, useState } from "react";

interface PriceListSelectorProps {
    currentPriceList?: number | null;
    trailerId: number;
}

export const PriceListSelector = ({
    currentPriceList,
    trailerId,
}: PriceListSelectorProps) => {
    const [items, setItems] = useState<PriceSelector[]>([]);
    const [selectedPriceListId, setSelectedPriceListId] = useState<
        number | null
    >(currentPriceList === undefined ? null : currentPriceList);
    const [selectedPriceList, setSelectedPriceList] = useState<Price | null>(
        null
    );

    const setTrailerPriceList = (value: number) => {
        switchTrailerPricelist(value, trailerId);
    };

    const handlePickerChange = (result: PickerReturn) => {
        let value = result.value;
        if (typeof value === "string") value = parseInt(value);

        setTrailerPriceList(value);
    };

    useEffect(() => {
        // Fetch all price list Selectors
        getPriceSelectors().then((data) => {
            data = data.filter(
                (item: PriceSelector) =>
                    item.id !== undefined && item.id !== null
            );
            setItems(data);
        });
    }, []);

    useEffect(() => {
        // Fetch all price list Selectors
        if (currentPriceList === null || currentPriceList === undefined) return;
        getPricelistById(currentPriceList).then((data) => {
            setSelectedPriceList(data);
            setSelectedPriceListId(data.id);
        });
    }, [currentPriceList]);

    return (
        <SelectorCombobox
            id="selectedPricelist"
            items={items}
            value={selectedPriceListId ? selectedPriceListId : undefined}
            onValueChange={handlePickerChange}
        />
    );
};
