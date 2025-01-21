import earnMore from '../../assets/Earnmore.jpg'
const EarnMore = () => {
  return (
    <section className="bg-gradient-to-r from-[#0a2027] to-[#072129] py-12 text-white">
      <div className="max-w-7xl gap-5 mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Earn More with Our Platform</h2>
          <p className="mb-6">
            Join thousands of users who are making extra income by completing simple tasks. It’s easy, flexible, and rewarding.
          </p>
          <button className="btn bg-transparent hover:bg-transparent text-white px-6 py-3 rounded-md hover:border-white border border-black">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src={earnMore}
            alt="Earn More"
            className="rounded-md shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default EarnMore;
