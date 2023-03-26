import { Checkbox,FormControlLabel  } from "@mui/material";

export default function CheckBox(props: any) {
    const { name, label, value, error = null, onChange, ...other } = props;
    return (
        // <Checkbox {...label} {...other} onChange={onChange}  color="success" />
        <FormControlLabel control={<Checkbox  {...label} {...other} 
         color="success" onChange={onChange} />} label={label} />
    )
}