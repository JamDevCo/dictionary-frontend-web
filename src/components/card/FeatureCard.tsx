import Image from 'next/image';
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
  textColor = "text-white",
  className = "",

}) => (
  <div className={`bg-white rounded-2xl p-1 shadow-xl transform hover:scale-105 transition-transform duration-300 ${className}`}>
    <div className={`${bgColor} rounded-xl overflow-hidden`}>
      <div className="h-64 relative">
        {image ? (
          <Image src={image} alt={title} width={400} height={256} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {title === "True or False Quiz" && (
              <div className="text-center">
                <h2 className="text-5xl font-black mb-4">True</h2>
                <div className="flex items-center justify-center gap-8 mb-4">
                  <span className="text-green-400 text-6xl">✓</span>
                  <span className="text-5xl font-black">or</span>
                  <span className="text-red-500 text-6xl">✗</span>
                </div>
                <h2 className="text-5xl font-black">False</h2>
              </div>
            )}
            {title === "Guess the meaning" && (
              <div className="flex items-center justify-center gap-2 p-8">
                <div className="bg-pink-200 w-20 h-20 rounded-2xl flex items-center justify-center transform rotate-12">
                  <span className="text-4xl">?</span>
                </div>
                <div className="bg-yellow-200 w-20 h-20 rounded-2xl flex items-center justify-center transform -rotate-6">
                  <span className="text-4xl">?</span>
                </div>
                <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-gray-400 text-3xl">✎</span>
                </div>
                <div className="bg-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center transform rotate-6">
                  <span className="text-4xl">?</span>
                </div>
              </div>
            )}
          </div>
        )}
        {title === "Slangs" && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center">
              {image && (
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className={`${title === "Slangs"
          ? "bg-yellow-600"
          : title === "True or False Quiz"
            ? "bg-cyan-600"
            : "bg-amber-700"
          } py-4`}
      >
        <h3 className={`text-center text-xl font-bold ${textColor}`}>
          {title === "Slangs" ? "Slangs" : title}
        </h3>
      </div>
    </div>
  </div>
);

export default FeatureCard;
