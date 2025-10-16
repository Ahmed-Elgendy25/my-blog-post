import { Card } from "@/components/ui/card";

interface ContentPreviewProps {
  title: string;
  subtitle: string;
  duration: string;
  content: string;
}

export function ContentPreview({
  title,
  subtitle,
  duration,
  content,
}: ContentPreviewProps) {
  return (
    <Card className="overflow-hidden">
      <article className="prose prose-neutral dark:prose-invert max-w-none p-6 lg:p-8">
        {/* Header */}
        <div className="not-prose mb-8 border-b pb-6">
          <div className="mb-2 flex items-center gap-3">
            {duration && (
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {duration}
              </span>
            )}
          </div>
          {title && (
            <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xl text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        <div className="tiptap-preview text-base leading-relaxed">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p className="text-muted-foreground italic">
              No content yet. Start writing to see your preview.
            </p>
          )}
        </div>
      </article>
    </Card>
  );
}
