// ui
import { 
  LeftContainer,
  MainContainer,
  RightContainer 
} from "@/components/containers/main-page-containers"
// components
import Avatar from "./_components/left-col/avatar"
import Navs from "./_components/left-col/navs"
import FeedsHeader from "./_components/feeds/feeds-header"
import FeedsReply from "./_components/feeds/feeds-reply"
import FeedsList from "./_components/feeds/feeds-list"

const MainPage = () => {
  return (
    <div className="flex w-full h-full">
      <LeftContainer>
        <Avatar />
        <Navs />
      </LeftContainer>
      <MainContainer>
        <FeedsHeader />
        <FeedsList />
        <FeedsReply />
      </MainContainer>
      <RightContainer>

      </RightContainer>
    </div>
  )
}

export default MainPage