import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

import { PickerReturn } from "@/types";

import { getCustomerById } from "@/data/customer";
import { getLicenseClasses } from "@/data/settings";

import { InputTP24 } from "@/Components/ui/input-tp24";
import { DecisionButtons } from "@/Components/decision-buttons";
import { CurrencyInput } from "@/Pages/Document/components/currency-input";
import { getPricelistById } from "@/data/price";
import { floatToString, stringToFloat } from "@/lib/curency-functions";

interface PriceFormProps {
    currentID: number;
    close: () => void;
}

export const PriceForm = ({ currentID, close }: PriceFormProps) => {
    const { data, setData, post, patch, processing, errors, clearErrors } =
        useForm({
            id: currentID,
            name: "",
            stunden5: 0,
            tag1: 0,
            wochenende: 0,
            wochen1: 0,
            wochen2: 0,
            wochen3: 0,
        });

    const handlePickerChange = (result: PickerReturn) => {
        const key = result.id;
        const value = result.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const handleChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const handleCurrencyChange = (
        e:
            | React.FormEvent<HTMLInputElement>
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLSelectElement>
    ) => {
        const key = e.currentTarget.id;
        const value = stringToFloat(e.currentTarget.value);
        setData((data) => ({
            ...data,
            [key]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentID) {
            post(route("price.store"), {
                only: ["prices", "errors"],
                onSuccess: () => {
                    toast.success("Preisliste erfolgreich angelegt");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim anlegen der Preisliste");
                },
            });
        } else {
            patch(route("price.update", currentID), {
                only: ["prices", "errors"],
                onSuccess: () => {
                    toast.success("Preisliste wurde erfolgreich geändert");
                    close();
                },
                onError: () => {
                    toast.error("Fehler beim ändern der Preisliste");
                },
            });
        }
    };
    useEffect(() => {
        const getCurrentPricelist = () => {
            if (currentID) {
                getPricelistById(currentID).then((price) =>
                    setData({ ...price })
                );
            }
        };
        getCurrentPricelist();
    }, []);

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-10 flex-col">
                    <div className="flex flex-col gap-6 w-full">
                        <InputTP24
                            label="Name der Preisliste *"
                            id="name"
                            value={data.name}
                            error={errors.name}
                            onFocus={() => clearErrors("name")}
                            onChange={handleChange}
                            disabled={processing}
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 w-full">
                        <CurrencyInput
                            label="5 Stunden"
                            id="stunden5"
                            value={data.stunden5 > 0 ? "" + data.stunden5 : ""}
                            error={errors.stunden5}
                            onValueChange={handleCurrencyChange}
                            onFinishedValueChange={handleCurrencyChange}
                            removeError={() => clearErrors("stunden5")}
                            disabled={processing}
                        />
                        <CurrencyInput
                            label="1 Tag"
                            id="tag1"
                            value={data.tag1 > 0 ? "" + data.tag1 : ""}
                            error={errors.tag1}
                            onValueChange={handleCurrencyChange}
                            onFinishedValueChange={handleCurrencyChange}
                            removeError={() => clearErrors("tag1")}
                            disabled={processing}
                        />
                        <CurrencyInput
                            label="Wochenende"
                            id="wochenende"
                            value={
                                data.wochenende > 0 ? "" + data.wochenende : ""
                            }
                            error={errors.wochenende}
                            onValueChange={handleCurrencyChange}
                            onFinishedValueChange={handleCurrencyChange}
                            removeError={() => clearErrors("wochenende")}
                            disabled={processing}
                        />
                        <CurrencyInput
                            label="1 Woche"
                            id="wochen1"
                            value={data.wochen1 > 0 ? "" + data.wochen1 : ""}
                            error={errors.wochen1}
                            onValueChange={handleCurrencyChange}
                            onFinishedValueChange={handleCurrencyChange}
                            removeError={() => clearErrors("wochen1")}
                            disabled={processing}
                        />
                        <CurrencyInput
                            label="2 Wochen"
                            id="wochen2"
                            value={data.wochen2 > 0 ? "" + data.wochen2 : ""}
                            error={errors.wochen2}
                            onValueChange={handleCurrencyChange}
                            onFinishedValueChange={handleCurrencyChange}
                            removeError={() => clearErrors("wochen2")}
                            disabled={processing}
                        />
                        <CurrencyInput
                            label="3 Wochen"
                            id="wochen3"
                            value={data.wochen3 > 0 ? "" + data.wochen3 : ""}
                            error={errors.wochen3}
                            onValueChange={handleCurrencyChange}
                            onFinishedValueChange={handleCurrencyChange}
                            removeError={() => clearErrors("wochen3")}
                            disabled={processing}
                        />
                    </div>
                </div>
                <DecisionButtons
                    yesLabel="Speichern"
                    noLabel="Abbrechen"
                    sendForm
                    noAction={close}
                />
            </form>
        </div>
    );
};
