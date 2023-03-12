import { Preloader, Bars } from "react-preloader-icon";

const Loader = (props: any) => {
  const { isLoadading } = props;
  return (
    isLoadading == true ?
      <div className="loading-page">
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