import "../styles/globals.css"
import type { AppProps } from "next/app"
import { inspect } from "@xstate/inspect"
import { createContext, useEffect } from "react"
import { useInterpret } from "@xstate/react"
import { authMachine } from "../machines/auth.machine"
import { InterpreterFrom } from "xstate"
import mixpanel from "mixpanel-browser"

// if (typeof window !== "undefined") {
//   inspect({
//     // options
//     // url: 'https://stately.ai/viz?inspect', // (default)
//     iframe: false, // open in new window
//   })
// }
interface GlobalStateContext {
  authService: InterpreterFrom<typeof authMachine>
}
export const GlobalStateContext = createContext({} as GlobalStateContext)

function MyApp({ Component, pageProps }: AppProps) {
  const authService = useInterpret(authMachine, {
    devTools: process.env.NODE_ENV === "development",
  })
  useEffect(() => {
    mixpanel.init("030ddddf19623797be516b634956d108", {
      debug: process.env.NODE_ENV === "development",
    })
    authService.send("INITIALIZE")
  }, [authService])

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      <Component {...pageProps} />
    </GlobalStateContext.Provider>
  )
}

export default MyApp