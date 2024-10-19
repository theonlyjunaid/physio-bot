import { SiteFooter } from "../components/home/Footer";
import { NavBar } from "../components/home/Navbar";
import PrivacyPolicy from "../components/Privacy/PrivacyPolicy";

const page = () => {
    return (
        <div>
            <NavBar />
            <PrivacyPolicy />
            <SiteFooter />
        </div>
    );
}
export default page;