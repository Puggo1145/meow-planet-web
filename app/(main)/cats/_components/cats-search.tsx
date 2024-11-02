import { useState } from "react"
// icons
import { SearchIcon, XIcon } from "lucide-react"
// components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"

interface CatsSearchProps {
  onSearch: (keyword: string) => void
  isSearching?: boolean
}

export const CatsSearch = ({ onSearch, isSearching }: CatsSearchProps) => {
  const [keyword, setKeyword] = useState("")

  const handleSearch = () => {
    onSearch(keyword)
  }

  const handleClear = () => {
    setKeyword("")
    onSearch("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="w-full flex items-center gap-x-4">
      {/* 搜索框 */}
      <div className="flex-1 relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="搜索猫猫..." 
          className="pl-10 h-[60px] text-base"
        />
        {keyword && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleClear}
          >
            <XIcon className="size-4" />
          </Button>
        )}
      </div>

      {/* 搜索按钮 */}
      <Button 
        className="flex items-center gap-x-2 size-[60px]"
        onClick={handleSearch}
        disabled={isSearching}
      >
        {isSearching ? <Loader size="sm" /> : <SearchIcon className="size-6" />}
      </Button>
    </div>
  )
} 