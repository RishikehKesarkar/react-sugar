import Control from "../../components";
import adminLayout from "../../masterLayout/adminLayout";

const Purchase = () => {
    return (
        <Control.Paper>
            <form>
                <Control.GridContainer>
                    <Control.GridItem>
                        <Control.Input label="from" />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input label="unit" />
                    </Control.GridItem>
                    <Control.GridItem>
                        <Control.Input label="mill" />
                    </Control.GridItem>
                </Control.GridContainer>
            </form>
        </Control.Paper>
    )
}

export default adminLayout(Purchase);