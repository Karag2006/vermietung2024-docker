import { PageTitle } from "@/Components/page-title";
import { CardWrapper } from "@/Components/wrapper/card-wrapper";

interface TableWrapperProps {
    children: React.ReactNode;
    header: string;
    headerActions?: React.ReactNode;
}

export const TableWrapper = ({
    children,
    header,
    headerActions,
}: TableWrapperProps) => {
    return (
        <CardWrapper
            header={<PageTitle title={header}>{headerActions}</PageTitle>}
            showHeader={header ? true : false}
        >
            <article>{children}</article>
        </CardWrapper>
    );
};
