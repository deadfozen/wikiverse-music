import Header from "@/components/header"
import SalukiWildEastPlayer from "./SalukiWildEastPlayer"

export default function SalukiWildEast() {
  return (
    <>
      <Header/>
      <main className="container flex-1 py-8">
        <SalukiWildEastPlayer/>
      </main>
    </>
  )
}