import { MessageCircle } from 'lucide-react'

export function StickyWhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/2348012345678?text=Hi!%20I%27m%20interested%20in%20ordering%20a%20jersey',
      '_blank'
    )
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:bg-[#20BA59] transition-all hover:scale-110 flex items-center space-x-2 group"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden group-hover:inline-block text-sm font-medium pr-1 whitespace-nowrap">
        Order Now
      </span>
    </button>
  )
}