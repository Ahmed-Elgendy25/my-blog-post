import { User, Calendar, Clock } from "lucide-react";

function ArticleInfoListComponent({
  author,
  date,
  readTime,
}: {
  author: string;
  date: string;
  readTime: string;
}) {
  return (
    <ul className="mt-6 flex list-none flex-wrap items-center gap-4 text-sm text-muted-foreground lg:gap-6">
      <li className="flex items-center gap-2">
        <User className="h-4 w-4" aria-hidden="true" />
        <span className="font-medium">{author.toLocaleUpperCase()}</span>
      </li>
      <li className="flex items-center gap-2">
        <Calendar className="h-4 w-4" aria-hidden="true" />
        <time dateTime={date}>{date}</time>
      </li>
      <li className="flex items-center gap-2">
        <Clock className="h-4 w-4" aria-hidden="true" />
        <span>{readTime}</span>
      </li>
    </ul>
  );
}

export default ArticleInfoListComponent;
