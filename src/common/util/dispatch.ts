import { useDispatch } from "react-redux";

export default function Dispatch(slice:any) {
    const dispatch = useDispatch();
    dispatch(slice);
}