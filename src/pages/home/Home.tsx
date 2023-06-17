import adminLayout from "../../masterLayout/adminLayout";
import Loader from "../../shared/loader";
import Control from "../../components";
import { Box } from "@mui/material";
const Home = () => {
    
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Control.Paper>
                {/* <Loader isLoading={sliceEnum.} /> */}
                <h2>Hello</h2>
            </Control.Paper>
        </Box>
    )
}

export default adminLayout(Home);