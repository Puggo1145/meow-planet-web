"use client"

// layout
import { 
  MainContainer,
  RightContainer 
} from "@/components/containers/main-page-containers"
// components
import FeedsHeader from "./_components/feeds/feeds-header"
import FeedsList from "./_components/feeds/feeds-list"
import FeedsReply from "./_components/feeds/feeds-reply"
import TodayRanks from "./_components/today-ranks"
import NewCats from "./_components/new-cats"

const FeedsPage = () => {
  return (
    <>
      <MainContainer>
        <FeedsHeader />
        <FeedsReply />
        <FeedsList />
      </MainContainer>
      <RightContainer>
        <TodayRanks />
        <NewCats />
      </RightContainer>
    </>
  )
}

export default FeedsPage