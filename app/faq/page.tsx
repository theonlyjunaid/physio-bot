import React from 'react'
import FAQs from '../components/home/FaQ'
import { NavBar } from '../components/home/Navbar'
import { SiteFooter } from '../components/home/Footer'

const page = () => {
    return (
        <div>
            <NavBar />
            <FAQs />
            <SiteFooter />
        </div>
    )
}

export default page