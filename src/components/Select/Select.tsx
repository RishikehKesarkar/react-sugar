import { TextField, Autocomplete } from "@mui/material";

export default function Select(props: any) {
    const { Id, name, label, value, option, error = null, onChange, ...other } = props;
    function getValue(id: any) {
        if (option.length > 0)
            return option.find((val: any) => val.id === id);
        return null;

    }

    return (
        <Autocomplete disablePortal
            id={Id}
            options={option}
            value={getValue(value)}
            onChange={onChange}
            getOptionLabel={(option: any) => option.label}
            renderInput={(params) => <TextField {...params} label={label}
                {...(error && { error: true, helperText: error })}
            />}
        />
    )
}