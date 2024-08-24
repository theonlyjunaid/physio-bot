// "use client";

// import Image from "next/image";
// import Slider from "react-slick";
// import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from "react";

// import image1 from "public/about-us/sprite1.webp";
// import image2 from "public/about-us/sprite2.webp";
// import profilePic1 from "public/about-us/pfp1.jpg";
// import profilePic2 from "public/about-us/pfp2.jpg";
// import profilePic3 from "public/about-us/pfp3.jpg";

// const AboutPage: React.FC = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//     };

//     useEffect(() => {
//         AOS.init({
//           duration: 1000,
//           once: true,
//         });
//       }, []);

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
//             {/* About Us Section */}
//             <section className="bg-white py-12 md:py-16 px-4 md:px-10 rounded-md shadow-md" data-aos="fade-right">
//                 <div className="max-w-4xl mx-auto text-left">
//                     <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//                         Discover Who We Are
//                     </h1>
//                     <p className="text-base md:text-lg leading-relaxed text-gray-800">
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus aliquid voluptatibus, corrupti autem, exercitationem voluptatum hic labore, expedita repudiandae cupiditate quam obcaecati nemo ratione quisquam ducimus animi corporis repellat nulla perferendis! Nam eaque cumque sapiente quas! Maiores harum aperiam consequuntur consequatur pariatur, vero unde. Minima debitis quas consequuntur numquam placeat.
//                     </p>
//                 </div>
//             </section>

//             {/* Mission Section */}
//             <section className="bg-white py-12 md:py-16 px-4 md:px-10 rounded-md shadow-md flex flex-col md:flex-row-reverse items-center" data-aos="fade-left">
//                 <div className="w-full md:w-1/2 mb-8 md:mb-0 md:ml-8">
//                     <Image
//                         src={image1}
//                         alt="Our Mission"
//                         className="rounded-md shadow-md"
//                     />
//                 </div>
//                 <div className="flex-1 text-left">
//                     <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//                         Our Mission: Helping Millions of Startups Grow Better
//                     </h2>
//                     <p className="text-base md:text-lg leading-relaxed text-gray-700">
//                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat sint doloribus pariatur odit provident. Nam nobis magni, cumque odit dolorum minima nostrum reiciendis. Animi ea maxime corporis, ut consequatur facilis.
//                     </p>
//                 </div>
//             </section>

//             {/* Our Story Section */}
//             <section className="bg-white py-12 md:py-16 px-4 md:px-10 rounded-md shadow-md flex flex-col md:flex-row items-center" data-aos="fade-right">
//                 <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8">
//                     <Image
//                         src={image2}
//                         alt="Our Story"
//                         className="rounded-md shadow-md"
//                     />
//                 </div>
//                 <div className="flex-1 text-left">
//                     <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//                         Our Story
//                     </h2>
//                     <p className="text-base md:text-lg leading-relaxed text-gray-700">
//                         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo minus autem unde assumenda adipisci enim. Quam ipsam unde nihil eum earum veritatis nisi libero corrupti, labore illo nam consectetur id debitis quisquam, reiciendis eius ipsum aliquid pariatur eveniet? Quos est iste molestias accusamus ab ad velit enim odio itaque aliquid dignissimos aut, deserunt corporis suscipit praesentium unde possimus magni repudiandae!
//                     </p>
//                 </div>
//             </section>

//             {/* Our Users' Thoughts Section */}
//             <section className="bg-white py-12 md:py-16 px-4 md:px-10 rounded-md shadow-md" data-aos="fade-left">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
//                         What Our Users Think
//                     </h2>
//                     <Slider {...settings} className="mt-6">
//                         <div className="p-4">
//                             <div className="bg-gray-50 rounded-md p-6 shadow-lg text-center">
//                                 <Image
//                                     src={profilePic1}
//                                     alt="User 1"
//                                     className="w-20 h-20 rounded-full mx-auto mb-4"
//                                 />
//                                 <p className="text-base md:text-lg leading-relaxed text-gray-700">
//                                     "This service has completely transformed my business. Highly recommend to all startups!"
//                                 </p>
//                                 <p className="mt-2 text-sm text-gray-500">- John Doe</p>
//                             </div>
//                         </div>
//                         <div className="p-4">
//                             <div className="bg-gray-50 rounded-md p-6 shadow-lg text-center">
//                                 <Image
//                                     src={profilePic2}
//                                     alt="User 2"
//                                     className="w-20 h-20 rounded-full mx-auto mb-4"
//                                 />
//                                 <p className="text-base md:text-lg leading-relaxed text-gray-700">
//                                     "Amazing platform with great support. My go-to for all things tech."
//                                 </p>
//                                 <p className="mt-2 text-sm text-gray-500">- Jane Smith</p>
//                             </div>
//                         </div>
//                         <div className="p-4">
//                             <div className="bg-gray-50 rounded-md p-6 shadow-lg text-center">
//                                 <Image
//                                     src={profilePic3}
//                                     alt="User 3"
//                                     className="w-20 h-20 rounded-full mx-auto mb-4"
//                                 />
//                                 <p className="text-base md:text-lg leading-relaxed text-gray-700">
//                                     "A reliable service that I can count on. It’s been a game-changer for my business."
//                                 </p>
//                                 <p className="mt-2 text-sm text-gray-500">- Michael Lee</p>
//                             </div>
//                         </div>
//                     </Slider>
//                 </div>
//             </section>

//             {/* Contact Us Section */}
//             <section className="bg-white py-12 md:py-16 px-4 md:px-10 rounded-md shadow-md" data-aos="fade-right">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//                         Contact Us
//                     </h2>
//                     <p className="text-base md:text-lg text-gray-700 mb-6">
//                         We'd love to hear from you! Follow us on our social media channels:
//                     </p>
//                     <div className="flex justify-center space-x-4 md:space-x-6">
//                         <a
//                             href="https://www.instagram.com"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
//                         >
//                             <FaInstagram size={30} />
//                         </a>
//                         <a
//                             href="https://www.linkedin.com"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
//                         >
//                             <FaLinkedin size={30} />
//                         </a>
//                         <a
//                             href="https://www.twitter.com"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
//                         >
//                             <FaTwitter size={30} />
//                         </a>
//                         <a
//                             href="https://www.facebook.com"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
//                         >
//                             <FaFacebook size={30} />
//                         </a>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default AboutPage;
import React from "react";

const AboutPage = () => {
  return <div>AboutPage</div>;
};

export default AboutPage;
