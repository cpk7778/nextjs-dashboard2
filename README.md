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
import { inter } from '@/app/ui/fonts';

export default function RootLayout({children}:{ children: React.ReactNode }){
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
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {<AcmeLogo />}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">

          {/*global.css*/}
          <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"/>

          {/*home.module.css*/}
          <div className={styles.shape}></div>
          <a href={"/dashboard"}>Dashboard</a>
          <a href={"/dashboard/invoices"}>Invoice</a>
          <a href={"/dashboard/customers"}>Customer</a>

          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
              src={"/hero-desktop.png"}
              width={1000}
              height={760}
              className="hidden md:block"
              alt={"Screenshot of the dashboard project showing desktop version"} />
          <Image
              src={"/hero-mobile.png"}
              width={560}
              height={620}
              className="hidden md:hidden"
              alt={"Screenshot of the dashboard project showing mobile version"} />
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
className={
    clsx(
        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
            'bg-sky-100 text-blue-600': pathname === link.href
        }
    )
}
```
- next/link로 <a>를 <Link>로 변경해서 Client-side navigation 사용
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
[ Chapter 6 ]
- Github에 프로젝트 업로드
- Vercel을 통해 배포
- Postgre DB 연결
- 