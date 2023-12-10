import {fetchCardData, fetchLatestInvoices, fetchRevenue} from "@/app/lib/data";
import {Card} from "@/app/ui/dashboard/cards";
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {' '}
        Dashboard{' '}
      </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Collected" value="1" type="collected" />
            <Card title="Pending" value="1" type="pending" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-8">
            <h1 className="flex">Lab실</h1>
        </div>
    </main>
  );
}
