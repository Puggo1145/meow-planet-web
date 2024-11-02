// ui
import { ScrollArea } from '@/components/ui/scroll-area'
// components
import { PageHeader } from '@/components/page-header'

const UploadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageHeader title="创建猫咪档案" useBackButton />
      <ScrollArea className="h-full">
        {children}
      </ScrollArea>
    </>
  )
}

export default UploadLayout