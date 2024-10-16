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

const FeedsPage = () => {
  return (
    <>
      <MainContainer>
        <FeedsHeader />
        <FeedsList />
        <FeedsReply />
      </MainContainer>
      <RightContainer>
        right cols
      </RightContainer>
    </>
  )
}

export default FeedsPage