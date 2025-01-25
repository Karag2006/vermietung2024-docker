import { getPricelistById } from "@/data/price";
import { Actions, PageProps } from "@/types";
import { Price, TrailerPrice } from "@/types/price";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import { ActionButton } from "@/Components/action-button";
import { DataTable } from "@/Components/data-table";
import { columns } from "./columns";
import { ModalCardWrapper } from "@/Components/wrapper/modal-card-wrapper";
import { DecisionButtons } from "@/Components/decision-buttons";
import { TriangleAlert } from "lucide-react";
import { PriceForm } from "./components/form";
import { Modal } from "@/Components/wrapper/modal";

type PriceProps = {
    prices: Price[];
    trailerPrices: TrailerPrice[];
} & PageProps;

const PriceIndex = ({ auth, prices, trailerPrices }: PriceProps) => {
    const pageTitle = "Preislisten";
    const [confirmModal, setConfirmModal] = useState(false);
    const [priceModalOpen, setPriceModalOpen] = useState(false);
    const [trailerModalOpen, setTrailerModalOpen] = useState(false);
    const [currentID, setCurrentID] = useState(0);
    const [deleteName, setDeleteName] = useState("");
    const Form = useForm({
        id: currentID,
    });

    const actions: Actions = {
        edit: {
            function: (id: number) => editPricelistModal(id),
            tooltip: "Preise bearbeiten",
        },
        delete: {
            function: (id: number) => deleteModal(id),
            tooltip: "Preisliste löschen",
        },
    };

    const addPricelistModal = () => {
        setCurrentID(0);
        setPriceModalOpen(true);
    };

    const editPricelistModal = (id: number) => {
        setCurrentID(id);
        setPriceModalOpen(true);
    };

    const deleteModal = (id: number) => {
        setCurrentID(id);
        getPricelistById(id).then((priceList) => {
            setDeleteName(priceList.name);
        });
        setConfirmModal(true);
    };

    const confirmDelete = (id?: number) => {
        Form.delete(route("price.destroy", id), {
            only: ["prices", "trailerPrices"],
            onSuccess: (page) => {
                toast.success("Preisliste gelöscht");
                setConfirmModal(false);
            },
        });
    };

    const cancelDelete = () => {
        setConfirmModal(false);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={pageTitle}
            headerAction={
                <ActionButton
                    label="Neue Preisliste Anlegen"
                    actionType="add"
                    action={addPricelistModal}
                />
            }
        >
            <Head title={pageTitle} />

            <DataTable columns={columns} data={prices} actions={actions} />
            <Modal modalOpen={confirmModal} openChange={setConfirmModal}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            Preisliste löschen
                        </h3>
                    }
                    showHeader
                    footer={
                        <DecisionButtons
                            yesLabel="Löschen"
                            noLabel="Abbrechen"
                            id={currentID}
                            yesAction={confirmDelete}
                            noAction={cancelDelete}
                        />
                    }
                >
                    <p>
                        Soll die Preisliste{" "}
                        <span className="font-bold">"{deleteName}"</span>{" "}
                        wirklich gelöscht werden?
                    </p>
                    <p className="flex gap-2">
                        <TriangleAlert className="h-5 w-5  text-destructive" />
                        Diese Aktion kann nicht rückgängig gemacht werden!
                        <TriangleAlert className="h-5 w-5  text-destructive" />
                    </p>
                </ModalCardWrapper>
            </Modal>
            <Modal modalOpen={priceModalOpen} openChange={setPriceModalOpen}>
                <ModalCardWrapper
                    header={
                        <h3 className="font-semibold text-xl text-gray-800">
                            {currentID === 0
                                ? "Preisliste Anlegen"
                                : "Preisliste bearbeiten"}
                        </h3>
                    }
                    showHeader
                >
                    <PriceForm
                        currentID={currentID}
                        close={() => setPriceModalOpen(false)}
                    />
                </ModalCardWrapper>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default PriceIndex;
