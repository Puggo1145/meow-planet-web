import { create } from "zustand"

export type FeedType = "current" | "loved"

interface FeedsState {
  currentFeed: FeedType
  setCurrentFeed: (feed: FeedType) => void
}

export const FeedsNavs = [
  "current",
  "loved",
] as const

export const FeedsNavsEnums: Record<string, string> = {
  current: "当下",
  loved: "喜欢",
}

export const useFeedsStore = create<FeedsState>()((set) => ({
  currentFeed: "current",
  setCurrentFeed: (feed) => {
    set({ currentFeed: feed })
  },
})) 