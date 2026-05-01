import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useSearchParams } from "react-router"

interface Props {
  totalPages: number
}

export const CustomPagination = ({ totalPages }: Props) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const queryPage = searchParams.get('page') ?? '1'
  const page = isNaN(+queryPage) ? 1 : +queryPage

  const handlePageChange = (p: number) => {
    if (p < 1 || p > totalPages) return

    // searchParams.set('page', page.toString())
    setSearchParams(prev => {
      prev.set('page', p.toString())
      return prev
    })
  }

  return (
    <>
      <div className="flex items-center justify-center space-x-2 mt-5">
        <Button onClick={() => handlePageChange(+page - 1)} variant="outline" size="sm" disabled={page === 1}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        {
          Array.from({ length: totalPages }).map((_, index) =>
            <Button
              onClick={() => handlePageChange(index + 1)} key={index}
              variant={page === index + 1 ? 'default' : 'outline'} size="sm">
              {index + 1}
            </Button>
          )
        }

        <Button onClick={() => handlePageChange(+page + 1)} variant="outline" size="sm">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
