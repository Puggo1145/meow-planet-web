import { MainContainer } from "@/components/containers/main-page-containers"
import type { PropsWithChildren } from "react"

const CatsLayout = ({ children }: PropsWithChildren) => {
  return (
    <MainContainer>
      {children}
    </MainContainer>
  )
}

export default CatsLayout