// ui
import { 
  LeftContainer,
  MainContainer,
  RightContainer 
} from "@/components/containers/main-page-containers"
// components
import Navs from "./_components/navs"
import Feeds from "./_components/feeds"


const MainPage = () => {
  return (
    <div className="flex w-full h-full">
      <LeftContainer>
        <Navs />
      </LeftContainer>
      <MainContainer>
        <Feeds />
      </MainContainer>
      <RightContainer>

      </RightContainer>
    </div>
  )
}

export default MainPage