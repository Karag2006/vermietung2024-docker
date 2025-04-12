import { getDocumentTypeTranslation } from "@/lib/utils";
import { Document, DocumentFunctions } from "@/types/document";
import { DocumentTooltipInfoItem } from "./document-tooltip-info-item";
import { DocumentTooltipActions } from "./document-tooltip-actions";

interface DocumentTooltipProps {
    document: Document;
    documentFunctions: DocumentFunctions;
}

export const DocumentTooltip = ({
    document,
    documentFunctions,
}: DocumentTooltipProps) => {
    const current_state = document.current_state;
    const documentNr =
        current_state === "offer"
            ? document.offer_number
            : current_state === "reservation"
            ? document.reservation_number
            : document.contract_number;

    const collectDate = document.collect_date ? document.collect_date : "";
    const collectTime = document.collect_time ? document.collect_time : "";
    const returnDate = document.return_date ? document.return_date : "";
    const returnTime = document.return_time ? document.return_time : "";

    return (
        <div className="p-2 border border-black">
            <DocumentTooltipInfoItem
                label="Status"
                value={getDocumentTypeTranslation(document.current_state)}
            />
            {document.collect_address && document.collect_address.name ? (
                <DocumentTooltipInfoItem
                    label="Abholstation"
                    value={document.collect_address.name}
                />
            ) : (
                <DocumentTooltipInfoItem
                    label="Abholstation"
                    value={"Keine Adresse"}
                />
            )}
            <DocumentTooltipInfoItem
                label="Kunde"
                value={document.customer_name1}
            />
            <DocumentTooltipInfoItem
                label="Mietpreis"
                value={`${document.total_price} €`}
            />
            <DocumentTooltipInfoItem
                label="Abholung"
                value={`${collectDate} - ${collectTime}`}
            />
            <DocumentTooltipInfoItem
                label="Rückgabe"
                value={`${returnDate} - ${returnTime}`}
            />
            {document.phone && (
                <DocumentTooltipInfoItem
                    label="Telefon"
                    value={document.phone}
                />
            )}
            {document.comment && (
                <DocumentTooltipInfoItem
                    label="Kommentar"
                    value={document.comment}
                />
            )}

            <DocumentTooltipActions
                documentId={document.id}
                documentState={document.current_state}
                documentNr={documentNr}
                documentFunctions={documentFunctions}
            />
        </div>
    );
};
