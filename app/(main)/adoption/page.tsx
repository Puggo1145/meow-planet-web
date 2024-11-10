import { ComingSoon } from "@/components/coming-soon"
import { MainContainer } from "@/components/containers/main-page-containers"
import images from "@/constants/images"
import { ScrollArea } from "@/components/ui/scroll-area"
const AdoptionPage = () => {
  return (
    <MainContainer>
      <ScrollArea className="h-full">
        <ComingSoon
          title="猫咪领养"
          description="我们正在积极推行猫咪领养，让校园里的小流浪们都能找到温暖的家。我们坚信，领养是比喂养更有效的关爱方式"
          features={[
            "完整的猫咪健康档案和性格记录，帮助匹配合适的家庭",
            "严格的领养人资质审核，确保猫咪找到负责任的主人",
          ]}
          imagePath={images.auth.authIllustration1.src}
          className="bg-repeat bg-opacity-5"
        />
        <div className="h-8" />
      </ScrollArea>
    </MainContainer>
  )
}

export default AdoptionPage;