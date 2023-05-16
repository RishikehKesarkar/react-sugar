import { useState } from "react";
import { toast } from "react-toastify";
import { sliceEnum } from "../common/enum/Enum";

interface ErrorProps {
    httpStatus: any,
    status: sliceEnum,
    message: string
}

export const MessageBoundry = (msg: any) => {
    toast.success(msg.message);
}