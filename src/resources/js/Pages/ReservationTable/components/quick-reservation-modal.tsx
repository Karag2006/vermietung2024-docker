import { CollectAddressItem, SelectorItem } from "@/types/document";

import { useEffect, useState } from "react";

import { getSettings } from "@/data/settings";

import { blankForm } from "@/lib/document-form";
import { getCustomerById, getCustomerSelectors } from "@/data/customer";
import { getTrailerById, getTrailerSelectors } from "@/data/trailer";
import {
    collisionCheck,
    getCollectAddresses,
    getDocumentById,
    storeDocument,
    updateDocument,
} from "@/data/document";
import { SelectorCombobox } from "@/Components/selector-combobox";
import { PickerReturn } from "@/types";
import { InputTP24 } from "@/Components/ui/input-tp24";
import { AddressCombobox } from "@/Pages/Document/components/address-combobox";
import { DatePicker } from "@/Components/datePicker";
import { TimePicker } from "@/Components/time-picker";
import { CurrencyInput } from "@/Pages/Document/components/currency-input";
import {
    calculateValues,
    floatToString,
    stringToFloat,
} from "@/lib/curency-functions";
import { DecisionButtons } from "@/Components/decision-buttons";
import { toast } from "sonner";
import { getDocumentTypeTranslation, isObjectEmpty } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { parse, set } from "date-fns";
import { TextareaTP24 } from "@/Components/ui/textarea-tp24";

interface QuickReservationModalProps {
    currentID: number;
    currentMonth: string;
    currentDocumentType?: string;
    currentDocumentNumber?: number;
    close: () => void;
}

export type QuickReservationErrors = {
    [key: string]: string;
};

export type QuickReservationFormEvent =
    | React.FormEvent<HTMLInputElement>
    | React.FormEvent<HTMLTextAreaElement>
    | React.FormEvent<HTMLSelectElement>;

export const QuickReservationModal = ({
    currentID,
    currentDocumentType,
    currentDocumentNumber,
    currentMonth,
    close,
}: QuickReservationModalProps) => {
    const germanDocumentType = currentDocumentType
        ? getDocumentTypeTranslation(currentDocumentType)
        : "Reservierung";
    const [data, setData] = useState(blankForm);
    const [customerList, setCustomerList] = useState<SelectorItem[]>([]);
    const [localCustomerId, setLocalCustomerId] = useState(0);
    const [trailerList, setTrailerList] = useState<SelectorItem[]>([]);
    const [localTrailerId, setLocalTrailerId] = useState(0);
    const [collectAdresses, setCollectAdresses] = useState<
        CollectAddressItem[]
    >([]);
    const [errors, setErrors] = useState<QuickReservationErrors>({});

    const [localPrice, setLocalPrice] = useState(
        floatToString(data.data.total_price)
    );

    const handleCustomerChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            customer: {
                ...data.customer,
                [key]: value,
            },
        }));
    };

    const handleDataChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            data: {
                ...data.data,
                [key]: value,
            },
        }));
    };

    const handleTextValueChange = (
        e: QuickReservationFormEvent,
        subFormKey: "data" | "customer"
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            [subFormKey]: {
                ...data[subFormKey],
                [key]: value,
            },
        }));
    };

    const handleCustomerPickerChange = (result: PickerReturn) => {
        const value = result.value;
        if (typeof value === "number") {
            setData((data) => ({
                ...data,
                customer: {
                    ...data.customer,
                    ["id"]: value,
                },
            }));
        }
    };

    const handleTrailerPickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            trailer: {
                ...data.trailer,
                [key]: value,
            },
        }));
    };

    const handleDataPickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            data: {
                ...data.data,
                [key]: value,
            },
        }));
    };

    const handleCurrencyInput = (e: React.FormEvent<HTMLInputElement>) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        setLocalPrice(value);

        setData((data) => ({
            ...data,
            data: {
                ...data.data,
                [key]: stringToFloat(value),
            },
        }));
    };

    const handleCurrencyValueChanged = (
        e: React.FormEvent<HTMLInputElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        if (key === "total_price") {
            const values = calculateValues(
                stringToFloat(value),
                data.data.reservation_deposit_value
                    ? data.data.reservation_deposit_value
                    : 0.0,
                data.settings.vat,
                false
            );
            setLocalPrice(floatToString(values.totalValue));
            setData((data) => ({
                ...data,
                data: {
                    ...data.data,
                    total_price: values.totalValue,
                    reservation_deposit_value: values.depositValue
                        ? values.depositValue
                        : 0.0,
                    netto_price: values.netValue ? values.netValue : 0.0,
                    tax_value: values.vatValue ? values.vatValue : 0.0,
                    final_payment_value: values.finalPayment
                        ? values.finalPayment
                        : 0.0,
                },
            }));
        }
    };

    const handleSubmit = () => {
        if (!currentID) {
            if (
                data.trailer.id &&
                data.data.collect_date &&
                data.data.return_date &&
                data.data.return_time &&
                data.data.collect_time
            ) {
                data.data.collect_at = parse(
                    data.data.collect_date + " " + data.data.collect_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                data.data.return_at = parse(
                    data.data.return_date + " " + data.data.return_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                collisionCheck({
                    id: undefined,
                    vehicle_id: data.trailer.id,
                    collect_date: data.data.collect_date,
                    return_date: data.data.return_date,
                    collect_time: data.data.collect_time,
                    return_time: data.data.return_time,
                    collect_at: data.data.collect_at,
                    return_at: data.data.return_at,
                })
                    .then((data) => {
                        if (data.collision === "no") storeNewDocument();
                        else {
                            // setCollision(data.collisionData);
                            // setCollisionDialog(true);
                            // open Dialog informing the user about the collision
                            // with options to continue saving anyway or cancel to fix first.
                        }
                    })
                    .catch(() => {
                        storeNewDocument();
                    });
            } else {
                storeNewDocument();
                // this will fail but will generate the appropriate error object.
            }
        } else {
            if (
                data.trailer.id &&
                data.data.collect_date &&
                data.data.return_date &&
                data.data.return_time &&
                data.data.collect_time
            ) {
                data.data.collect_at = parse(
                    data.data.collect_date + " " + data.data.collect_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                data.data.return_at = parse(
                    data.data.return_date + " " + data.data.return_time,
                    "dd.MM.yyyy HH:mm",
                    new Date()
                );
                collisionCheck({
                    id: currentID,
                    vehicle_id: data.trailer.id,
                    collect_date: data.data.collect_date,
                    return_date: data.data.return_date,
                    collect_time: data.data.collect_time,
                    return_time: data.data.return_time,
                    collect_at: data.data.collect_at,
                    return_at: data.data.return_at,
                })
                    .then((data) => {
                        if (data.collision === "no") documentUpdate();
                        else {
                            // setCollision(data.collisionData);
                            // setCollisionDialog(true);
                            // open Dialog informing the user about the collision
                            // with options to continue saving anyway or cancel to fix first.
                        }
                    })
                    .catch(() => {
                        documentUpdate();
                    });
            } else documentUpdate();
        }
    };

    const storeNewDocument = () => {
        storeDocument(data)
            .then((data) => {
                if (data && data.errors) {
                    setErrors(data.errors);
                    const article = "der";
                    toast.error(`Fehler beim anlegen ${article} Reservierung`);
                } else if (!data.errors) {
                    toast.success(`Reservierung erfolgreich angelegt`);
                    close();
                    router.visit(
                        route("reservationTable", { month: currentMonth })
                    );
                }
            })
            .catch((error) => {
                // console.log("error: ", error.response.data.errors);
                setErrors(error.response.data.errors);
                const article = "der";
                toast.error(`Fehler beim anlegen ${article} Reservierung`);

                // if (error) {
                //     let customerEntries: string[][] = [];
                //     let driverEntries: string[][] = [];
                //     let trailerEntries: string[][] = [];
                //     let dataEntries: string[][] = [];
                //     Object.entries(error).forEach((err) => {
                //         const dotIndex = err[0].indexOf(".");
                //         const bagName = err[0].substring(0, dotIndex);
                //         const fieldName = err[0].substring(dotIndex + 1);
                //         const message = err[1];
                //         if (bagName === "customer")
                //             customerEntries.push([fieldName, message]);
                //         if (bagName === "driver")
                //             driverEntries.push([fieldName, message]);
                //         if (bagName === "trailer")
                //             trailerEntries.push([fieldName, message]);
                //         if (bagName === "data")
                //             dataEntries.push([fieldName, message]);
            });
        // .finally(() => {
        //     close();
        //     router.visit(
        //         route("reservationTable", { month: currentMonth })
        //     );
        // });

        //     console.log(
        //         isObjectEmpty(Object.fromEntries(driverEntries))
        //     );

        // setDataErrors({
        //     customer: Object.fromEntries(customerEntries),
        //     driver: Object.fromEntries(driverEntries),
        //     trailer: Object.fromEntries(trailerEntries),
        //     data: Object.fromEntries(dataEntries),
        // });
    };

    const documentUpdate = () => {
        updateDocument(currentID, data)
            .then((data) => {
                if (data && data.errors) {
                    setErrors(data.errors);
                    const article = "der";
                    toast.error(`Fehler beim anlegen ${article} Reservierung`);
                } else if (!data.errors) {
                    toast.success(
                        `${germanDocumentType} erfolgreich aktualisiert`
                    );
                    close();
                    router.visit(
                        route("reservationTable", { month: currentMonth })
                    );
                }
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
                const article = "der";
                toast.error(`Fehler beim anlegen ${article} Reservierung`);
            });
    };

    const removeError = (key: string) => {
        setErrors((errors) => {
            delete errors[key];
            return { ...errors };
        });
    };

    useEffect(() => {
        // Use Effects die nur beim laden der Komponente ausgeführt werden:
        getSettings().then((settings) =>
            setData((data) => ({
                ...data,
                settings: settings,
            }))
        );
        getCustomerSelectors().then((data) => {
            setCustomerList(data);
        });
        getTrailerSelectors().then((data) => {
            setTrailerList(data);
        });
        getCollectAddresses().then((data) => {
            setCollectAdresses(data);
        });
        // Wenn das Modal mit einer ID geladen wird sind wir im Edit Mode
        // Dann benötigen wir die gesamten Daten des dazu gehörenden Dokument.
        if (currentID > 0) {
            getDocumentById(currentID).then((document) => {
                setData({ ...document });
                setLocalPrice(floatToString(document.data.total_price));
            });
        }
    }, []);

    useEffect(() => {
        const getCurrentCustomer = () => {
            if (data.customer.id > 0 && localCustomerId !== data.customer.id) {
                getCustomerById(data.customer.id).then((customer) => {
                    setLocalCustomerId(data.customer.id);
                    setData((data) => ({
                        ...data,
                        customer: { ...customer },
                    }));
                });
            }
            if (!data.customer.id || data.customer.id <= 0)
                setData((data) => ({
                    ...data,
                    customer: { ...blankForm.customer },
                }));
        };
        getCurrentCustomer();
    }, [data.customer.id]);

    useEffect(() => {
        const getCurrentTrailer = () => {
            if (data.trailer.id > 0 && localTrailerId !== data.trailer.id) {
                getTrailerById(data.trailer.id).then((trailer) => {
                    setLocalTrailerId(data.trailer.id);
                    setData((data) => ({
                        ...data,
                        trailer: { ...trailer },
                    }));
                });
            }
        };
        getCurrentTrailer();
    }, [data.trailer.id]);

    useEffect(() => {
        if (errors) {
            console.log("errors: ", errors);
        }
    }, [errors]);

    return (
        <div className="p-4 w-full flex flex-col gap-12">
            <div className="flex gap-8 justify-between mb-4">
                {currentID > 0 ? (
                    <h2 className="text-xl font-bold">
                        {germanDocumentType} Nr:{" "}
                        <span className="font-extrabold">
                            {currentDocumentNumber}
                        </span>{" "}
                        bearbeiten
                    </h2>
                ) : (
                    <h2 className="text-xl font-bold">
                        {germanDocumentType} anlegen
                    </h2>
                )}
                <DecisionButtons
                    className="ml-4"
                    yesLabel="Speichern"
                    noLabel="Abbrechen"
                    yesAction={handleSubmit}
                    noAction={close}
                />
            </div>
            <div className="flex gap-8 justify-between">
                <div className="md:w-[calc(50%-1.25rem)]">
                    <SelectorCombobox
                        id="id"
                        value={data.trailer.id}
                        items={trailerList}
                        error={errors["trailer.title"]}
                        removeError={() => removeError("trailer.title")}
                        onValueChange={handleTrailerPickerChange}
                        label={"Anhänger auswählen *"}
                    />
                </div>
                <div className="flex gap-8">
                    <AddressCombobox
                        className="w-[20rem]"
                        items={collectAdresses}
                        label="Abhol Anschrift *"
                        id="collect_address_id"
                        value={data.data.collect_address_id}
                        error={errors["data.collect_address_id"]}
                        removeError={() =>
                            removeError("data.collect_address_id")
                        }
                        onValueChange={handleDataPickerChange}
                    />
                </div>
            </div>

            <div className="flex gap-6 flex-col lg:flex-row lg:justify-between">
                <DatePicker
                    value={data.data.collect_date}
                    id="collect_date"
                    label="Abholung - Datum *"
                    fieldName="data.collect_date"
                    error={errors["data.collect_date"]}
                    removeError={() => removeError("data.collect_date")}
                    onUpdateValue={handleDataPickerChange}
                />
                <TimePicker
                    value={data.data.collect_time}
                    id="collect_time"
                    label="Abholung - Uhrzeit *"
                    fieldName="data.collect_time"
                    error={errors["data.collect_time"]}
                    removeError={() => removeError("data.collect_time")}
                    onUpdateValue={handleDataPickerChange}
                />
                <DatePicker
                    value={data.data.return_date}
                    id="return_date"
                    label="Rückgabe - Datum *"
                    fieldName="data.return_date"
                    error={errors["data.return_date"]}
                    removeError={() => removeError("data.return_date")}
                    onUpdateValue={handleDataPickerChange}
                />
                <TimePicker
                    value={data.data.return_time}
                    id="return_time"
                    label="Rückgabe - Uhrzeit *"
                    fieldName="data.return_time"
                    error={errors["data.return_time"]}
                    removeError={() => removeError("data.return_time")}
                    onUpdateValue={handleDataPickerChange}
                />
            </div>
            <div className="flex gap-8">
                <InputTP24
                    className="md:w-[calc(50%-1.25rem)]"
                    label="Name des Kunden *"
                    id="name1"
                    value={data.customer.name1}
                    error={errors["customer.name1"]}
                    onFocus={() => removeError("customer.name1")}
                    onChange={(e) => handleTextValueChange(e, "customer")}
                />
                <span>oder: </span>
                <div className="md:w-[calc(50%-1.25rem)]">
                    <SelectorCombobox
                        id="customer_id"
                        value={data.customer.id}
                        items={customerList}
                        onValueChange={handleCustomerPickerChange}
                        label={"Kunden auswählen"}
                    />
                </div>
            </div>

            <div className="flex gap-80 ">
                <div className="flex flex-col gap-y-12 w-[30rem]">
                    <CurrencyInput
                        className="w-full"
                        id="total_price"
                        value={localPrice}
                        label="Preis (Brutto) *"
                        error={errors["data.total_price"]}
                        fieldname="data.total_price"
                        removeError={removeError}
                        onValueChange={handleCurrencyInput}
                        onFinishedValueChange={handleCurrencyValueChanged}
                    />
                    <InputTP24
                        className="w-full"
                        label="Telefonnummer (optional)"
                        id="phone"
                        value={data.customer.phone}
                        error={errors["customer.phone"]}
                        onFocus={() => removeError("customer.phone")}
                        onChange={(e) => handleTextValueChange(e, "customer")}
                    />
                </div>
                <TextareaTP24
                    className="w-full"
                    label="Kommentar (optional)"
                    id="comment"
                    value={data.data.comment}
                    error={errors["data.comment"]}
                    onChange={(e) => handleTextValueChange(e, "data")}
                    onFocus={() => removeError("data.comment")}
                />
            </div>

            <div className="flex justify-end">
                <DecisionButtons
                    className="ml-4"
                    yesLabel="Speichern"
                    noLabel="Abbrechen"
                    yesAction={handleSubmit}
                    noAction={close}
                />
            </div>
        </div>
    );
};
