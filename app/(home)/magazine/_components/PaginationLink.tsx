import Link from "next/link"

type PaginationLinkProps = React.ComponentProps<typeof Link>

function PaginationLink({...props}: PaginationLinkProps) {
  return (
      <Link {...props} />
  )
}

export default PaginationLink