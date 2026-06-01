import Image from "next/image";

interface CardProps {
  image?: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor?: string;
  className?: string;
}

const FeatureCard: React.FC<CardProps> = ({
  image,
  title,
  bgColor,
  className = "",

}) => (
  <div className={`bg-white rounded-2xl p-1 shadow-xl transform hover:scale-105 transition-transform duration-300 ${className}`}>
    <div className={`${bgColor} rounded-xl overflow-hidden`}>
      <div className="h-64 relative">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {title === "True or False Quiz" && (
              <div className="h-full pb-9 flex flex-col items-center justify-center text-center font-black text-black leading-none">
                <h2 className="text-5xl">True</h2>
                <div className="flex items-center justify-center gap-5">
                  <span className="text-green-500 text-5xl">✓</span>
                  <span className="text-4xl">or</span>
                  <span className="text-red-500 text-5xl">✗</span>
                </div>
                <h2 className="text-5xl">False</h2>
              </div>
            )}

            {title === "Guess the meaning" && (
              <div className="flex items-center justify-center gap-2">
                <div className="bg-pink-200 w-14 h-14 rounded-lg flex items-center justify-center rotate-12">
                  <span className="text-3xl">?</span>
                </div>
                <div className="bg-yellow-200 w-14 h-14 rounded-lg flex items-center justify-center -rotate-6">
                  <span className="text-3xl">?</span>
                </div>
                <div className="bg-white w-14 h-14 rounded-lg flex items-center justify-center shadow">
                  <span className="text-gray-400 text-2xl">✎</span>
                </div>
                <div className="bg-blue-200 w-14 h-14 rounded-lg flex items-center justify-center rotate-6">
                  <span className="text-3xl">?</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    
        <div className="absolute bottom-2 left-2 right-2">
        <div
          className={`${
            title === "Slangs"
              ? "bg-yellow-300"
              : title === "True or False Quiz"
              ? "bg-cyan-500"
              :  "bg-[#A98B5A]"
            } rounded-md px-2 py-1 border-3 border-white/60`}
        >
          <h3 className={`text-center text-xs font-bold text-black`}>
            {title}
          </h3>
        </div>

      </div>
    </div>
  </div>
);

export default FeatureCard;