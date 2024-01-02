import { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
  const encoder = new TextEncoder()
  const formatter = new Intl.DateTimeFormat("en", { timeStyle: "medium" })
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("<html><body><ol>"))
      let i = 0
      const timer = setInterval(() => {
        controller.enqueue(
          encoder.encode(
            `<li>Hello at ${formatter.format(new Date())}</li>\n\n`
          )
        )
        if (i++ >= 26) {
          controller.enqueue(encoder.encode("</ol></body></html>"))
          controller.close()
          clearInterval(timer)
        }
      }, 50)
    }
  })

  return new Response(body)
}