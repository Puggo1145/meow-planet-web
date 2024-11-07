import { TEAM_IDS, USER_LABELS } from "./appwrite"

type RouteConfig = {
  isPublic?: boolean // 是否公开路由
  isAuth?: boolean // 是否认证路由
  team?: string // 需要的团队权限
  labels?: string[] // 需要的标签权限
  redirect?: string // 重定向路径
}

// 路由配置表
export const routeConfig: Record<string, RouteConfig> = {
  // 公开路由
  "/": {
    isPublic: true,
    redirect: "/today"
  },
  "/sign-in": {
    isPublic: true,
    redirect: "/today"
  },
  "/sign-up": {
    isPublic: true,
    redirect: "/today"
  },

  // 需要认证的路由
  "/today": {
    isAuth: true
  },
  "/cats": {
    isAuth: true
  },
  "/cats/upload": {
    isAuth: true,
    labels: [USER_LABELS.CAT_MAINTAINER]
  },
  "/user": {
    isAuth: true
  },

  // 特殊路由
  "/unauthorized": {
    isAuth: true
  }
}

// 获取路由配置
export const getRouteConfig = (pathname: string): RouteConfig | null => {
  // 精确匹配
  if (routeConfig[pathname]) {
    return routeConfig[pathname]
  }

  // 动态路由匹配
  const dynamicRoutes = [
    { pattern: /^\/cats\/[\w-]+$/, config: routeConfig["/cats"] }
  ]

  for (const { pattern, config } of dynamicRoutes) {
    if (pattern.test(pathname)) {
      return config
    }
  }

  return null
} 