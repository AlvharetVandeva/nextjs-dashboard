import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { revenue } from "@/app/lib/placeholder-data";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";
import SideNav from "../ui/dashboard/sidenav";

export default async function DashboardPage() {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    const {numberOfInvoices, totalPaidInvoices, totalPendingInvoices} = await fetchCardData();
    return (
        <main>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card title="Collected" value={totalPaidInvoices} type="collected"/>
                        <Card title="Pending" value={totalPendingInvoices} type="pending"/>
                        <Card title="Total Invoices" value={numberOfInvoices} type="invoices"/>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                        <RevenueChart revenue={revenue}/>
                        <LatestInvoices latestInvoices={latestInvoices}/>
                    </div>
                </div>
            </div>
        </main>
    )
}