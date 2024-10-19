import { SiteFooter } from "../components/home/Footer";
import { NavBar } from "../components/home/Navbar";
import AboutUs from "../components/AboutUs/AboutUs";
const page = () => {
  return (
    <div>
      <NavBar />
      <AboutUs />
      <SiteFooter />

    </div>
  );
};

export default page;