import { SiteFooter } from "../components/home/Footer";
import { NavBar } from "../components/home/Navbar";
import TermsConditions from "../components/Terms&Conditions/TermsConditions";

const page = () => {
  return (
    <div>
      <NavBar />
      <TermsConditions />
      <SiteFooter />
    </div>
  );
};

export default page;
