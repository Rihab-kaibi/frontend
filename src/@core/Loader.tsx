// ** MUI Import

import { Box, Loader } from "@mantine/core"


const FallbackSpinner = () => {
  // ** Hook


  return (
    <Box
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',

      }}
    >


			<Loader size={30} />
    </Box>
  )
}

export default FallbackSpinner
