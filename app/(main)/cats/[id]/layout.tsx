import { ScrollArea } from "@/components/ui/scroll-area"
import { PageHeader } from "@/components/page-header"

const CatDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageHeader title="猫咪档案" useBackButton />
      <ScrollArea className="h-full">
        {children}
      </ScrollArea>
    </>
  )
}

export default CatDetailLayout