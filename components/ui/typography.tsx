import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "muted" | "small"
}

export function Typography({ 
  variant = "default", 
  className, 
  ...props 
}: TypographyProps) {
  return (
    <p
      className={cn(
        "text-sm",
        variant === "muted" && "text-muted-foreground",
        variant === "small" && "text-xs",
        className
      )}
      {...props}
    />
  )
} 