import { ComponentProps } from "react"

const MainLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="w-full h-screen flex">
        {children}
    </div>
  )
}

export default MainLayout