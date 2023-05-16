import { NavigateFunction } from 'react-router-dom';

interface commonPros {
    row: any,
    navigate: NavigateFunction
}
export interface editClickProps extends commonPros {

}
export interface deleteClickProps extends commonPros {
    setConfirmDialog: any,
    confirmDialog:any
}
export interface addClickProps {
    navigate: NavigateFunction
}
