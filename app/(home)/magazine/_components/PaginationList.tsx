'use client'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import PaginationLink from "./PaginationLink"
import {useSearchParams} from "next/navigation"

function PaginationList({totalPages} : {
    totalPages: number
}) {

    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1

    return (
        <Pagination className="my-5">
            <PaginationContent>
                {
                  
                        <PaginationItem>
                            <PaginationPrevious href={`?page=${page - 1}`} className="me-2 bg-black text-white font-medium px-3 py-2 rounded-b-2xl rounded-t-2xl"/>
                        </PaginationItem>
                   
                }
                {
                    Array
                        .from({length: totalPages})
                        .map((_, index) => (
                            <PaginationItem key={index} >
                                <PaginationLink href={`?page=${index + 1}`} className="   bg-black text-white font-medium px-2 py-1  rounded-b-2xl rounded-t-2xl">
                                    {index + 1}</PaginationLink>
                            </PaginationItem>
                        ))
                }

                {
                    totalPages > 3 && (
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                    )
                }
                {
                    
                        <PaginationItem>
                            <PaginationNext  href={`?page=${page + 1}`} className="ms-2 bg-black text-white font-medium px-3 py-2 rounded-b-2xl rounded-t-2xl"/>
                        </PaginationItem>
                    
                }

            </PaginationContent>
        </Pagination>
    )
}

export default PaginationList