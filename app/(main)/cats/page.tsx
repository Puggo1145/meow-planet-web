// components
import {
  CatCard,
  CatCardImage,
  CatCardInfo,
  CatCardInfoName,
  CatCardInfoLikes,
  CatCardImageUpdates
} from "../_components/cat-card"
// mock
import { mockCats } from "@/mock/cats-mock"

const CatsPage = () => {
  return (
    <ul className="w-full h-fit pt-4 grid grid-cols-5 gap-4">
      {mockCats.map((cat) => (
        <CatCard key={cat.id}>
          <CatCardImage src={cat.image.src} />
          <CatCardInfo>
            <CatCardImageUpdates>
              最近新增 12 张图片
            </CatCardImageUpdates>
            <CatCardInfoName>{cat.name}</CatCardInfoName>
            <CatCardInfoLikes likes={cat.likes} />
          </CatCardInfo>
        </CatCard>
      ))}
    </ul>
  )
}

export default CatsPage