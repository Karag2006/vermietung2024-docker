import axios from "axios";

export const getPricelistById = async (id: number) => {
    const { data } = await axios.get(route("price.show", id));
    return data;
};

export const getPriceSelectors = async () => {
    const { data } = await axios.get(route("price.selectors"));
    return data;
};

export const switchTrailerPricelist = async (
    priceListId: number,
    trailerId: number
) => {
    await axios.patch(route("price.switchTrailerPricelist", trailerId), {
        priceId: priceListId === 0 ? null : priceListId,
        trailerId: trailerId,
    });
};
