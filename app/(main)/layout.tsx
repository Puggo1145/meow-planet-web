import { ComponentProps } from "react"

const MainLayout = ({ children }: ComponentProps<'div'>) => {
  return (
    <div className="max-w-[1440px] w-full h-screen mx-auto flex">
        {children}
    </div>
  )
}

export default MainLayout