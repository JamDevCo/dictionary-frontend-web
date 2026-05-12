import Image from 'next/image';

interface GrammarCardProps {
  title: string
  image: string
  onClick?: () => void
}

export default function GrammarCard({ title, image, onClick }: GrammarCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="h-40 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          width={400}
          height={160}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 bg-gray-50">
        <h3 className="font-medium text-gray-900 text-sm text-center">
          {title}
        </h3>
      </div>
    </div>
  )
}