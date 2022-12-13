import { useState } from "react"
//import { useTheme } from "@mui/material/styles"
import { Box, Button, Drawer, Stack, Typography } from "@mui/material"
import { useStore } from "../../store"

type WalletDrawerProps = {
  isOpen: boolean
  onClose: () => void
  address: string
  formattedAddress: string
}

export default function WalletDrawer(props: WalletDrawerProps) {
  //const { palette } = useTheme()
  const logout = useStore((state) => state.logout)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(props.address)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <Drawer
      id="menu-appbar"
      anchor="right"
      keepMounted
      open={props.isOpen}
      onClose={props.onClose}
      BackdropProps={{ style: { opacity: 0 } }}
      sx={{
        display: { xs: "block", lg: "none" },
        "& .MuiDrawer-paper": {
          width: "100%",
          mt: "3.6rem",
          background: "black",
        },
      }}
    >
      <Box p="1rem">
        <Typography variant="small">{props.formattedAddress}</Typography>
        <Stack
          mt="1rem"
          direction="row"
          justifyContent="space-between"
          gap=".5rem"
        >
          <Button variant="secondary" fullWidth>
            {!copied ? "Copy Address" : "Copied!"}
          </Button>
          <Button variant="secondary" fullWidth onClick={logout}>
            Disconnect
          </Button>
        </Stack>
      </Box>
    </Drawer>
  )
}
