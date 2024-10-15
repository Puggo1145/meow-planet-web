import FeedsHeader from "./feeds-header"
import FeedsReply from "./feeds-reply"

const Feeds = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <FeedsHeader />
      <div className="flex-1">feeds items</div>
      <FeedsReply />
    </div>
  )
}

export default Feeds