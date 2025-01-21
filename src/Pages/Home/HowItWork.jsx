const HowItWork = () => {
  const steps = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create an account to join our platform and explore available tasks.",
    },
    {
      step: 2,
      title: "Choose Tasks",
      description: "Browse tasks and select ones that fit your skills and schedule.",
    },
    {
      step: 3,
      title: "Earn & Withdraw",
      description: "Complete tasks, earn money, and withdraw your earnings easily.",
    },
  ];

  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-[#072129]">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-gradient-to-r from-[#0a2027] to-[#072129] shadow-lg rounded-lg p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 flex items-center justify-center bg-base-200 text-black border border-[#072129] rounded-full text-xl font-bold">
                  {step.step}
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
