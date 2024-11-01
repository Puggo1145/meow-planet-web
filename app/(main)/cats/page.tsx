// ui
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// components
import { CatsHeader } from "./_components/cats-header"
import {
  CatCard,
  CatCardImage,
  CatCardInfo,
  CatCardInfoName,
  CatCardInfoLikes,
} from "../_components/cat-card"
import { ListEnd } from "@/components/list-end"
import { CatsMaintainers } from "./_components/cats-maintainers"
import { CatsSearch } from "./_components/cats-search"
// mock
import { mockCats } from "@/mock/cats-mock"

const CatsPage = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col gap-y-4 pl-1">
      <CatsHeader />
      <CatsSearch />
      <ScrollArea className="flex-1">
        <CatsMaintainers />
        <ul className="mt-4 w-fit grid grid-cols-5 gap-4">
          {mockCats.map((cat) => (
            <CatCard key={cat.id}>
              <CatCardImage src={cat.image.src} />
              <CatCardInfo>
                <CatCardInfoName>{cat.name}</CatCardInfoName>
                <CatCardInfoLikes likes={cat.likes} />
              </CatCardInfo>
            </CatCard>
          ))}
        </ul>
        <ListEnd />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default CatsPage