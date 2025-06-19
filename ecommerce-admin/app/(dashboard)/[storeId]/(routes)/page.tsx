import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

interface DashboardPageProps {
    params: Promise<{ storeId: string }>
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
    const store = await prismadb?.store?.findFirst({
        where: {
            id: (await params).storeId,
        },
    });

    if (!store) {
        redirect("/");
    }

    return (
        <div>
            Active Store: {store?.name}
        </div>
    )
}

export default DashboardPage;