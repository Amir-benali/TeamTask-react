import { clsx } from "clsx"

export function Alert({ className, ...props }) {
  return (
    <div
      role="alert"
      className={clsx(
        "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }) {
  return <div className={clsx("text-sm [&_p]:leading-relaxed", className)} {...props} />
}
