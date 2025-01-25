import { floatToString } from "@/lib/curency-functions";

interface CurrencyDisplayProps {
    amount?: number | null;
}

export const CurrencyDisplay = ({ amount }: CurrencyDisplayProps) => {
    if (amount === null || amount === undefined || amount <= 0) {
        return <span> - </span>;
    }
    return <span>{floatToString(amount, 0)} €</span>;
};
