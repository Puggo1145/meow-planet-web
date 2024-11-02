import { TEAM_IDS, USER_LABELS } from "./appwrite"

export interface RouteConfig {
  auth?: boolean
  team?: string
  labels?: string[]
}

export const routeConfig: Record<string, RouteConfig> = {
  "/cats/upload": {
    auth: true,
    team: TEAM_IDS.ADMINS,
    labels: [USER_LABELS.CAT_MAINTAINER],
  },
}

export const isProtectedRoute = (pathname: string): RouteConfig | undefined => {
  return Object.entries(routeConfig).find(([route]) => 
    pathname.startsWith(route)
  )?.[1]
} 