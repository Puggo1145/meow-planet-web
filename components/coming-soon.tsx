import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// images
import images from "@/constants/images"

interface ComingSoonProps {
  title: string
  description: string
  features: string[]
  imagePath?: string
  className?: string
  imageClassName?: string
}

export const ComingSoon = ({
  title,
  description,
  features,
  imagePath = images.auth.authIllustration2.src,
  className,
  imageClassName
}: ComingSoonProps) => {
  return (
    <div className={cn("h-full flex flex-col items-center justify-center px-4", className)}>
      <div className="max-w-2xl mx-auto text-center">
        <div className={cn("relative w-64 h-64 mx-auto mb-8", imageClassName)}>
          <Image
            src={imagePath}
            alt="Coming Soon"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
          {title}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          {description}
        </p>
        <div className="space-y-2 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-secondary/50 backdrop-blur-sm"
            >
              {feature}
            </div>
          ))}
        </div>
        <Button variant="outline" size="lg">
          敬请期待
        </Button>
      </div>
    </div>
  )
} 