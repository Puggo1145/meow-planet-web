// ui
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
// components
import { CatsHeader } from "./_components/cats-header"
import { CatsList } from "./_components/cats-list"
import { CatsMaintainers } from "./_components/cats-maintainers"
import { CatsSearch } from "./_components/cats-search"


const CatsPage = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col gap-y-4 pl-1">
      <CatsHeader />
      <CatsSearch />
      <ScrollArea className="flex-1">
        <CatsMaintainers />
        <CatsList />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default CatsPage