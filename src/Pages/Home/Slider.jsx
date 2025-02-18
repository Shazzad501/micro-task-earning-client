import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import task1 from "../../assets/task1.avif";
import task2 from "../../assets/task2.avif";
import task3 from "../../assets/task3.avif";
import { Link } from "react-router-dom";
import useUserByEmail from "../../Hooks/useUserByEmail";
import { useEffect, useState } from "react";

const banners = [
  {
    img: task1,
    title: "Turn Your Free Time Into Earnings",
    description:
      "Discover flexible opportunities to earn from anywhere. Choose tasks that fit your schedule and skills, and watch your income grow seamlessly.",
  },
  {
    img: task2,
    title: "One Platform, Endless Earning Possibilities",
    description:
      "From freelance gigs to everyday tasks, explore a world of opportunities to boost your income. Sign up today and start earning effortlessly.",
  },
  {
    img: task3,
    title: "Earn More, Achieve More",
    description:
      "Unlock your potential with diverse earning options. Whether you're a student, professional, or stay-at-home parent, we've got tasks tailored just for you.",
  },
];

const Slider = () => {

  const [signInUser] = useUserByEmail();
  const [navigation, setNavigation] = useState('')
  const {  role } = signInUser || {};

    // get started btn navigation mathod
    useEffect(()=>{
      if(role === 'admin'){
        setNavigation('/dashboard/admin-home')
      }
      else if(role === 'buyer'){
        setNavigation('/dashboard/buyer-home')
      }
      else if(role === 'worker'){
        setNavigation('/dashboard/worker-home')
      }
      else{
        setNavigation('/signIn')
      }
    }, [role])

  return (
    <div className="bg-black pt-20">
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        stopOnHover
        showThumbs={false}
        showStatus={false}
      >
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${banner.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>

            {/* Centered Content */}
            <div className="relative text-white text-center px-5 max-w-2xl">
              <h2 className="font-bold text-3xl md:text-5xl mb-4">
                {banner.title}
              </h2>
              <p className="font-medium text-lg md:text-xl mb-6">
                {banner.description}
              </p>
              <Link to={navigation} className="btn font-bold text-base bg-transparent border rounded-md text-white hover:bg-white hover:text-black transition duration-300">
                Get Started
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
