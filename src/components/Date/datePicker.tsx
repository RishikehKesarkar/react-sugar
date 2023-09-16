import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

export default function datePicker(props: any) {
  const { name, label, value, onChange, format, ...other } = props;
  const convertToDefEventPara = (name: any, value: any) => ({
    target: {
      name, value
    },
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        inputFormat={format}
        value={value}
        {...other}
        onChange={onChange}
        renderInput={(params) => <TextField name={name} {...params} />}
      />
    </LocalizationProvider>
  );
}
