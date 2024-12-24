import { Card, CardContent } from "@/components/ui/card";

export const FormSkeleton = () => {
  return (
    <Card className="border-border bg-card animate-pulse">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-muted rounded" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
