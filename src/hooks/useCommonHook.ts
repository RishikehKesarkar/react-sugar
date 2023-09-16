import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";

const useCommonHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    return { dispatch, navigate, location };
}

export default useCommonHook