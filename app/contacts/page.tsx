import { NavBar } from "../components/home/Navbar";
import { SiteFooter } from "../components/home/Footer";
import Contact from "../components/Contacts/Contact";

const page = () => {
    return(
        <div>
            <NavBar />
            <Contact/>
            <SiteFooter/>
        </div>
    );
}

export default page;