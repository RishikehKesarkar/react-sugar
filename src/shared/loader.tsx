import { Preloader, Bars } from "react-preloader-icon";
import { sliceEnum } from "../common/enum/Enum";
import Control from "../components";

interface LoaderProps {
  isLoading: sliceEnum
}

const Loader = (props: LoaderProps) => {
  const { isLoading } = props;
  return (
    isLoading == sliceEnum.loading ?
      <div className="loading-page" >
        <div className="center">
          <Preloader
            use={Bars}
            size={60}
            strokeWidth={10}
            strokeColor="#f7b085"
            duration={600}
          />
        </div>
      </div>
      : null
  )
}

export default Loader;