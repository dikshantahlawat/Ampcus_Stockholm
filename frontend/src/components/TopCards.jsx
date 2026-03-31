import { Footprints, Moon, Flame } from "lucide-react";

const TopCards = ({ stats }) => {
  const data = [
    {
      title: "Steps",
      value: stats?.steps || 0,
      icon: <Footprints size={20} />,
    },
    {
      title: "Sleep",
      value: `${stats?.sleep || 0} hrs`,
      icon: <Moon size={20} />,
    },
    {
      title: "Calories",
      value: `${stats?.calories || 0} kcal`,
      icon: <Flame size={20} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item, i) => (
        <div
          key={i}
          className="p-5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg hover:scale-[1.02] transition"
        >
          <div className="flex items-center gap-2 text-gray-400">
            {item.icon}
            <p>{item.title}</p>
          </div>

          <h2 className="text-2xl text-[#00E5FF] font-bold mt-2">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default TopCards;
