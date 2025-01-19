import axios from "axios";

export const emptyCustomer = {
    id: 0,
    pass_number: "",
    name1: "",
    name2: "",
    birth_date: "",
    birth_city: "",
    street: "",
    plz: "",
    city: "",
    phone: "",
    email: "",
    driving_license_no: "",
    driving_license_class: "",
    car_number: "",
    comment: "",
};

export type Customer = typeof emptyCustomer;

export const getCustomerById = async (id: number) => {
    const { data } = await axios.get(`/customer/${id}`);
    return data;
};

export const getCustomerSelectors = async () => {
    const { data } = await axios.get("/selector/customer");
    return data;
};

export const addCustomerFromDocument = async (customer: Customer) => {
    const { data } = await axios.post("/api/customer", customer);
    return data;
};

export const changeCustomerFromDocument = async (
    id: number,
    customer: Customer
) => {
    const { data } = await axios.patch(`/api/customer/${id}`, customer);
    return data;
};
