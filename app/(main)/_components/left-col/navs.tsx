import { 
  CompassIcon,
  MessageCircleMoreIcon,
  ListOrderedIcon,
  SettingsIcon
} from "lucide-react"

const Navs: React.FC = () => {
  const mockNavs = [
    {
      icon: CompassIcon,
      text: "Feeds"
    },
    {
      icon: MessageCircleMoreIcon,
      text: "Messages"
    },
    {
      icon: ListOrderedIcon,
      text: "Ranking"
    },
    {
      icon: SettingsIcon,
      text: "Settings"
    }
  ]

  return (
    <div className="flex flex-col gap-y-4 mt-6">
      {mockNavs.map((nav, index) => (
        <div key={index} className="flex items-center gap-x-3 p-4 cursor-pointer hover:bg-secondary rounded-2xl">
          <nav.icon size={24} />
          <p className="text-sm font-bold">{nav.text}</p>
        </div>
      ))}
    </div>
  )
}

export default Navs