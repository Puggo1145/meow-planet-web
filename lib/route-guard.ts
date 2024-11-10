import { Models } from 'appwrite'
import { pathToRegexp } from 'path-to-regexp'

export type RouteGuardConfig = {
  // 需要登录才能访问
  requireAuth?: boolean
  // 基于角色的访问控制
  roleBasedAccess?: {
    // 需要的标签，满足其中之一即可
    labels?: string[]
    // 需要的团队，满足其中之一即可
    teams?: string[]
  }
}

export type RouteGuardMap = {
  [pattern: string]: RouteGuardConfig
}

export const checkUserAccess = (
  user: Models.User<Models.Preferences> | null,
  teams: Models.Team<Models.Preferences>[],
  config: RouteGuardConfig
): boolean => {
  // 检查是否需要登录
  if (config.requireAuth && !user) {
    return false
  }

  // 检查角色权限
  if (config.roleBasedAccess) {
    const { labels, teams: requiredTeams } = config.roleBasedAccess

    // 如果设置了 labels，检查用户是否有所需标签之一
    if (labels && labels.length > 0) {
      const hasRequiredLabel = labels.some(label => 
        user?.labels?.includes(label)
      )
      if (!hasRequiredLabel) return false
    }

    // 如果设置了 teams，检查用户是否在所需团队之一中
    if (requiredTeams && requiredTeams.length > 0) {
      const hasRequiredTeam = requiredTeams.some(teamName =>
        teams.some(team => team.name === teamName)
      )
      if (!hasRequiredTeam) return false
    }
  }

  return true
}

// 新增: 根据当前路径找到匹配的路由配置
export const findMatchingRouteConfig = (
  pathname: string,
  routeGuardConfig: RouteGuardMap
): RouteGuardConfig | undefined => {
  // 1. 先尝试精确匹配
  if (routeGuardConfig[pathname]) {
    return routeGuardConfig[pathname]
  }

  // 2. 遍历所有路由模式进行通配符匹配
  for (const pattern of Object.keys(routeGuardConfig)) {
    // 修复: 直接使用 pathToRegexp 创建正则表达式
    const regexp = pathToRegexp(pattern).regexp
    if (regexp.test(pathname)) {
      return routeGuardConfig[pattern]
    }
  }

  return undefined
} 