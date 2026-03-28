import React from "react";

const TopCards = () => {
  const data = [
    { title: "Steps", value: "8,400" },
    { title: "Sleep", value: "7.5 hrs" },
    { title: "Calories", value: "1,900 kcal" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item, i) => (
        <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg">
          <p className="text-gray-400">{item.title}</p>
          <h2 className="text-2xl text-[#00E5FF] font-bold mt-2">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default TopCards;