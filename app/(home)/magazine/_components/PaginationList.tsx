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
import { useSearchParams } from "next/navigation"


function PaginationList({totalPages}: {totalPages: number}) {
 
    const searchParams = useSearchParams()
    const page = Number(searchParams.get('page')) || 1

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`?page=${page - 1}`}/>
                </PaginationItem>
               {
                Array.from({length:totalPages}).map((_,index) =>(
                    <PaginationItem key={index}>
                        <PaginationLink href={`?page=${index+1}`}> {index + 1}</PaginationLink>
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
                
                <PaginationItem>
                    <PaginationNext href={`?page=${page + 1}`}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationList