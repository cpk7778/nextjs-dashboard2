## 프로젝트 생성

`npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"`

`npm i`

`npm run dev`

http://localhost:3000

## 파일 구조

`/app/layout.tsx` : Root 접속 시 실행.

`app/page.tsx`

`app/ui/global.css` : 모든 컴포넌트에서 사용 가능

## Root layout.tsx

메인 레이아웃에 {children}을 통해 `app/page.tsx` 내용을 표시함

```javascript
// app/layput.tsx
import '@/app/ui/global.css';
import {inter} from '@/app/ui/fonts';

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <body className={`${inter.className} antialiasing`}>{children}</body>
        </html>
    );
}
```

```javascript
// app/page.tsx
import AcmeLogo from '@/app/ui/acme-logo';
import {ArrowRightIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import {lusitana} from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
                {<AcmeLogo/>}
            </div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">

                    {/*global.css*/}
                    <div
                        className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"/>

                    {/*home.module.css*/}
                    <div className={styles.shape}></div>
                    <a href={"/dashboard"}>Dashboard</a>
                    <a href={"/dashboard/invoices"}>Invoice</a>
                    <a href={"/dashboard/customers"}>Customer</a>

                    <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                        <strong>Welcome to Acme.</strong>
                        This is the example for the{' '}
                        <a href="https://nextjs.org/learn/" className="text-blue-500">
                            Next.js Learn Course
                        </a>
                        , brought to you by Vercel.
                    </p>

                    <Link
                        href="/login"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Log in</span>
                        <ArrowRightIcon className="w-5 md:w-6"/>
                    </Link>
                </div>
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                    {/* Add Hero Images Here */}
                    <Image
                        src={"/hero-desktop.png"}
                        width={1000}
                        height={760}
                        className="hidden md:block"
                        alt={"Screenshot of the dashboard project showing desktop version"}/>
                    <Image
                        src={"/hero-mobile.png"}
                        width={560}
                        height={620}
                        className="hidden md:hidden"
                        alt={"Screenshot of the dashboard project showing mobile version"}/>
                </div>
            </div>
        </main>
    );
}

```

## Nested 라우팅

- 폴더 구조를 URL Path에 맞게 생성
  ![ex_screensh](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Ffolders-to-url-segments.png&w=1920&q=75&dpl=dpl_54AWYLY3HswKUKjy3SWYU1w7hxRS)
- 하위 폴더에 page.tsx 생성
  ![ex_screensh](https://nextjs.org/_next/image?url=%2Flearn%2Flight%2Frouting-solution.png&w=1920&q=75&dpl=dpl_54AWYLY3HswKUKjy3SWYU1w7hxRS)

## Navigation-link

`clsx` 라이브러리 가져오기

```javascript
import clsx from "clsx";
```

```javascript
className = {
    clsx(
    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
{
    'bg-sky-100 text-blue-600'
:
    pathname === link.href
}
)
}
```

- next/link로 `<a>`를 `<Link>`로 변경해서 Client-side navigation 사용
- next/navigation의 {usePathname} 사용을 위해 'use client' 설정
- clsx를 적용해 활성 링크를 조건부로 클래스(서식) 적용

```javascript
// nav-links.tsx
'use client'

import {UserGroupIcon, HomeIcon, DocumentDuplicateIcon} from '@heroicons/react/24/outline';
import Link from "next/link"; // <Link> 기능 가져오기
import {usePathname} from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    {name: 'Home', href: '/dashboard', icon: HomeIcon},
    {name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon},
    {name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon},
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={
                            clsx(
                                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                                {
                                    'bg-sky-100 text-blue-600': pathname === link.href
                                }
                            )
                        }
                    >

                        <LinkIcon className="w-6"/>
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}
```

[ Chapter 6 : Database 설정 ]

- Github에 프로젝트 업로드
- Vercel을 통해 배포

- Postgre DB 연결

- `.env.example`을 `.env`로 변경
- Vercel 사이트 env 정보를 로컬 .env에 입력

```javascript
// .env
#
Copy
from.env.local
on
the
Vercel
dashboard
#
https://nextjs.org/learn/dashboard-app/setting-up-your-database#create-a-postgres-databasePOSTGRES_URL="postgres://default:S2rkJNxvlA3n@ep-small-meadow-18713611-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_PRISMA_URL = "postgres://default:S2rkJNxvlA3n@ep-small-meadow-18713611-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING = "postgres://default:S2rkJNxvlA3n@ep-small-meadow-18713611.us-east-1.postgres.vercel-storage.com:5432/verceldb"
POSTGRES_USER = "default"
POSTGRES_HOST = "ep-small-meadow-18713611-pooler.us-east-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD = "S2rkJNxvlA3n"
POSTGRES_DATABASE = "verceldb"

#
`openssl rand -base64 32`
AUTH_SECRET =
    AUTH_URL = http
://localhost:3000/api/auth
```

- `.gitignore`에 `.env` 포함
- 터미널에서 `npm i @vercel/postgres` 입력
- `package.json` 파일 내 `"seed": "node -r dotenv/config ./scripts/seed.js"` 추가

```json
// package.json
{
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "prettier": "prettier --write --ignore-unknown .",
    "prettier:check": "prettier --check --ignore-unknown .",
    "start": "next start",
    "seed": "node -r dotenv/config ./scripts/seed.js"
  }
  ```

- `npm run seed` 실행 -> 에러 발생 -> 순서데로 진행하면 OK

- DB에 수기 입력
    - `seed.js`파일 내 sql 스크립트 + `placeholder-data.js` 내 json 데이터 조합
    - console 스크립트 위치
    - C:\Users\10482\AppData\Roaming\JetBrains\IntelliJIdea2023.2\consoles\db\1bcbb2a0-b0db-417a-907e-e6a7054ffffe

```sql
CREATE TABLE IF NOT EXISTS users
(
    id UUID DEFAULT uuid_generate_v4
(
) PRIMARY KEY,
    name VARCHAR
(
    255
) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    );
```

```sql
INSERT INTO users (id, name, email, password)
VALUES ('410544b2-4001-4271-9855-fec4b6a6442a',
        'User',
        'user@nextmail.com',
        '123456')
```

# Chapter 7 : 데이터 Fetching

## 기본 구성

`/app/lib/data.ts`에 `import { sql } from '@vercel/postgres';` 추가해 데이터를 가져온다.

`/app/lib/definitions.ts`는 데이터 형식을 export 한다.

`/app/dashboard/page.tsx`는 `data.ts`의 `fetchRevenue`, `fetchLatestInvoices`, `fetchCardData`를 import한다.

```javascript
import {Card} from '@/app/ui/dashboard/cards';
import {lusitana} from '@/app/ui/fonts';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import {fetchRevenue, fetchLatestInvoices, fetchCardData} from '@/app/lib/data';

export default async function Page() {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    const {numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices} = await fetchCardData();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            < /h1>
            < div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Collected"
                      value={totalPaidInvoices}
                      type="collected" / >
                    <Card title="Pending"
                          value={totalPendingInvoices}
                          type="pending" / >
                        <Card title="Total Invoices"
                              value={numberOfInvoices}
                              type="invoices" / >
                            <Card
                                title="Total Customers"
                                value={numberOfCustomers}
                                type="customers"
                                / >
            </div>
            < div
                className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={revenue}
                />
                < LatestInvoices
                    latestInvoices={latestInvoices}
                />
            < /div>
        < /main>
)
;
}
```

