import { NavBar } from "../components/home/Navbar";
import { SiteFooter } from "../components/home/Footer";
import ContactUs from "../components/Contacts/Contact";
const page = () => {
    return (
        <div>
            <NavBar />
            <ContactUs />
            <SiteFooter />
        </div>
    );
}

export default page;