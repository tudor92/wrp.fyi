import { Loader} from "lucide-react"

export function Loading() {
    return (
      <div className="grid justify-center items-center w-screen h-screen">
        <main className="grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* <Skeleton className="w-96 h-12 rounded-full" /> */}
          <svg class="animate-spin h-12" viewBox="0 0 24 24">
            <Loader />
          </svg>
        </main>
    </div> 
  )}
  