import "../styles/globals.css"
import { AppProps } from "next/app"
import { useEffect } from "react"
import mixpanel from "mixpanel-browser"
import { ThemeProvider, useMediaQuery } from "@mui/material"

import { theme } from "../styles/theme"
import { useStore } from "../store"
import { Snackbar } from "../components/Snackbar"

function MyApp({ Component, pageProps }: AppProps) {
  const init = useStore((state) => state.init)
  const onMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    mixpanel.init("030ddddf19623797be516b634956d108", {
      debug: process.env.NEXT_PUBLIC_APP_ENV === "development",
    })
    init()
  }, [init])

  return (
    <ThemeProvider theme={theme}>
      {!onMobile && <div className="backdrop"></div>}
      <Component {...pageProps} />
      <Snackbar />
    </ThemeProvider>
  )
}

export default MyApp
