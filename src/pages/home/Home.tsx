import adminLayout from "../../masterLayout/adminLayout";
import Loader from "../../shared/loader";
import Control from "../../components";
import Cookies from "js-cookie";

const Home = () => {
    return (
        <Control.Paper>
            <Loader isLoading={false} />
            <h2>Hello</h2>
        </Control.Paper>
    )
}

export default adminLayout(Home);