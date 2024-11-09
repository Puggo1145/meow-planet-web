import { RouteGuardMap } from "@/lib/route-guard"

export const routeGuardConfig: RouteGuardMap = {
  // 需要登录的路由
  "/today": { requireAuth: true },
  "/cats": { requireAuth: true },
  "/adoption": { requireAuth: true },
  "/ranking": { requireAuth: true },
  "/settings": { requireAuth: true },
  "/user": { requireAuth: true },

  // 需要特定角色的路由
  "/cats/upload": {
    requireAuth: true,
    roleBasedAccess: {
      labels: ["catMaintainer"],
    }
  },
}

// 不需要登录就能访问的路由
export const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/unauthorized"
] 