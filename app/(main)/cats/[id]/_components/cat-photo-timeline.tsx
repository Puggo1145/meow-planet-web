import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { format } from "date-fns"
// ui
import { ScrollArea } from "@/components/ui/scroll-area"
// components
import { ListEnd } from "@/components/list-end"
// hooks
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll"
// utils
import { cn } from "@/lib/utils"
import { toast } from "sonner"
// services
import { getCatImageByTime } from "@/services/cats"
// types
import type { CatImageDocument } from "@/types/cats"
import { CatPhotoPreview } from "./cat-photo-preview"

interface CatPhotoTimelineProps {
  catId: string
}

interface GroupedImages {
  [key: string]: CatImageDocument[]
}

export const CatPhotoTimeline = ({ catId }: CatPhotoTimelineProps) => {
  const [images, setImages] = useState<CatImageDocument[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedImage, setSelectedImage] = useState<CatImageDocument | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const loadImages = async (cursor?: string) => {
    try {
      setIsLoading(true)
      const { images: newImages, hasMore: more } = await getCatImageByTime(catId, {
        cursor,
        limit: 8
      })

      if (cursor) {
        setImages(prev => [...prev, ...newImages])
      } else {
        setImages(newImages)
      }
      setHasMore(more)
    } catch (error) {
      toast.error("获取照片失败: " + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return
    const lastImage = images[images.length - 1]
    loadImages(lastImage.$id)
  }

  useInfiniteScroll(loadMoreRef, {
    onLoadMore: handleLoadMore,
    hasMore,
    isLoading
  })

  useEffect(() => {
    loadImages()
  }, [catId])

  // Group images by month
  const groupedImages = images.reduce((groups: GroupedImages, image) => {
    const month = format(new Date(image.$createdAt), "yyyy年MM月")
    if (!groups[month]) {
      groups[month] = []
    }
    groups[month].push(image)
    return groups
  }, {})

  return (
    <div className="col-span-3 mt-8">
      <h2 className="text-xl font-semibold mb-6">时光机</h2>
      <ScrollArea className="w-full pr-4">
        <div className="space-y-8">
          {Object.entries(groupedImages).map(([month, monthImages]) => (
            <section key={month} className="space-y-4">
              <h3 className="text-lg font-medium">{month}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {monthImages.map((image) => (
                  <div
                    key={image.$id}
                    className={cn(
                      "aspect-square rounded-xl overflow-hidden",
                      "cursor-pointer hover:opacity-90 transition-opacity bg-secondary"
                    )}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.url}
                      alt={`Cat photo ${image.$id}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <ListEnd
          isLoading={isLoading}
          hasMore={hasMore}
        />
        <div
          ref={loadMoreRef}
          className="h-4 w-full"
        />
      </ScrollArea>

      <CatPhotoPreview 
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  )
} 