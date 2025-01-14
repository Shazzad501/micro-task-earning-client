import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import task1 from '../../assets/task1.avif'
import task2 from '../../assets/task2.avif'
import task3 from '../../assets/task3.avif'


const banners = [
  {
    img: task1,
    title: 'Turn Your Free Time Into Earnings',
    description: 'Discover flexible opportunities to earn from anywhere. Choose tasks that fit your schedule and skills, and watch your income grow seamlessly.'
  },
  {
    img: task2,
    title: 'One Platform, Endless Earning Possibilities',
    description: "From freelance gigs to everyday tasks, explore a world of opportunities to boost your income. Sign up today and start earning effortlessly."
  },
  
  {
    img: task3,
    title: 'Earn More, Achieve More',
    description: "Unlock your potential with diverse earning options. Whether you're a student, professional, or stay-at-home parent, we've got tasks tailored just for you."
  },

]
const Slider = () => {
  return (
    <div className="bg-black py-20">
    <Carousel
     autoPlay 
     infiniteLoop 
     interval={2000} 
     stopOnHover 
     showThumbs={false} 
     showStatus={false}
    >
       {banners.map((banner, idx)=><div key={idx} className='grid grid-cols-1 md:grid-cols-2 gap-6 text-white'>
        <div className="h-[450px] rounded-md">
          <img src={banner.img} alt="banner img" className="w-full h-full rounded-md object-cover" />
        </div>
        <div className="flex flex-col gap-3 items-center justify-center px-5">
          <h2 className="font-bold text-3xl">{banner.title}</h2>
          <p className="font-bold text-base">{banner.description}</p>
          <button className="btn font-bold text-base bg-transparent border rounded-md text-white hover:text-black mt-4">Get Started</button>
        </div>
       </div>)}       
    </Carousel>
    </div>
  );
};

export default Slider;