import { clsx } from "clsx"

export function Card({ className, ...props }) {
  return <div className={clsx("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={clsx("p-6 pt-0", className)} {...props} />
}
