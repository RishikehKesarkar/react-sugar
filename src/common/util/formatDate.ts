import {format,getTime,formatDistanceToNow,addDays} from 'date-fns'

export const fDate=(date?:any, newFormat?:any)=> {
    const fm = newFormat || 'dd/MM/yyyy';
    date = date || new Date();
    return date ? format(new Date(date), fm) : '';
  }
  
  export const fDateTime=(date?:any, newFormat?:any)=> {
    const fm = newFormat || 'dd MMM yyyy p';
    date = date || new Date();
    return date ? format(new Date(date), fm) : '';
  }
  
  export const fTimestamp=(date:any)=> {
    return date ? getTime(new Date(date)) : '';
  }
  
  export const fToNow=(date:any)=> {
    return date
      ? formatDistanceToNow(new Date(date), {
          addSuffix: true,
        })
      : '';
  }

  export const fAddDate=(date:any,amount:any,newFormat?:any)=>{
    const fm = newFormat || 'dd/MM/yyyy';
    const adddays=addDays(new Date(date),amount);
    console.log("add",date ? format(new Date(adddays), fm) : '');
    return date ? format(new Date(adddays), fm) : '';
   // return date ? addDays(new Date(date),amount):'';
  }