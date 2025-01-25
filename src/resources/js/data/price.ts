import axios from "axios";

export const getPricelistById = async (id: number) => {
    const { data } = await axios.get(route("price.show", id));
    return data;
};
