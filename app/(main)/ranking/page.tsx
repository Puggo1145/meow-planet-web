import { ComingSoon } from "@/components/coming-soon"
import { MainContainer } from "@/components/containers/main-page-containers"
import { ScrollArea } from "@/components/ui/scroll-area"

const RankingPage = () => {
  return (
    <MainContainer>
      <ScrollArea className="h-full pb-4">
        <ComingSoon
          title="猫咪排行榜"
          description="即将推出更全面的猫咪数据分析和排行体系"
          features={[
            "多维度排行：人气、照片数、互动量等多个维度的排行",
            "实时更新的趋势榜，发现最受欢迎的猫咪",
            "季度和年度最佳猫咪评选活动",
            "社区投票和评选机制，让每个人都能参与"
          ]}
          imageClassName="w-72 h-72"
          className="bg-gradient-to-b from-background to-secondary/20"
        />
        <div className="h-8" />
      </ScrollArea>
    </MainContainer>
  )
}

export default RankingPage