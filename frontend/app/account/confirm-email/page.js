'use client'
import React, { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '@/components/nav-section/Nav'
import BackgroundImages from '@/components/hero-section/BackgroundImages'
import EmailVerification from '@/components/auth/EmailVerification'
import Footer from '@/components/footer-section/Footer'

function Verify() {
  const searchParams = useSearchParams()

  useEffect(() => {
    document.title = 'QuickSearchPlus'
  }, [])
  return (
    <main className="bg-[#D9E2FF]">
      <div className="fixed z-[99] w-full bg-[#D9E2FF]">
        <Nav activeLink="" removeAuth />
      </div>
      <div className="relative top-[12vh]">
        <div className="pt-3 bg-gradient-to-b from-[#D9E2FF] to-[#FFFFFF] md:pt-[1.5vw]">
          <BackgroundImages />
        </div>
        <EmailVerification
          hash={searchParams.get('h')}
          ttl={searchParams.get('t')}
          sig={searchParams.get('sig')}
        />
        <Footer />
      </div>
    </main>
  )
}

export default function RenderVerify() {
  return (
    <Suspense>
      <Verify />
    </Suspense>
  )
}
