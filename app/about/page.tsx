import { SiteFooter } from "../components/home/Footer";
import { NavBar } from "../components/home/Navbar";
import AboutPage from "../components/AboutUs/AboutPage";
const page = () => {
  return (
    <div>
      <NavBar />
      <AboutPage />
      <SiteFooter />
  
    </div>
  );
};

export default page;