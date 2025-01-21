const Features = () => {
  const features = [
    {
      title: "Flexible Micro Tasks",
      description: "Find tasks that match your skills and interests. Work anytime, anywhere.",
      icon: "🕒",
    },
    {
      title: "Instant Payouts",
      description: "Withdraw your earnings quickly with multiple secure payment options.",
      icon: "💳",
    },
    {
      title: "Trusted by Thousands",
      description: "Join a community of workers who trust us to provide consistent earning opportunities.",
      icon: "🌟",
    },
  ];

  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#072129]">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-[#0a2027] to-[#072129] text-white shadow-md rounded-lg p-6 text-center border-t-4 border-black"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
