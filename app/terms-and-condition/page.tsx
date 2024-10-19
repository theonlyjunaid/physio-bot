import { SiteFooter } from "../components/home/Footer";
import { NavBar } from "../components/home/Navbar";
import TermsAndConditions from "../components/Terms&Conditions/TermsConditions";

const page = () => {
  return (
    <div>
      <NavBar />
      <TermsAndConditions />
      <SiteFooter />
    </div>
  );
};

export default page;
