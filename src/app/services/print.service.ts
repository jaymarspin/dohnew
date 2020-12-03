import { Injectable } from '@angular/core';
import * as moment from "moment"
@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

  ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

getIssuedDate(date):string{
  let day = date.split("-")[2]
  return this.ordinal_suffix_of(day.replace(/^0+/, ''))+" day of "+moment(date.split("-")[1]).format('MMMM')+" "+date.split("-")[0];
}
getDate(date2):string{
  let day2 = date2.split("-")[2]
  return this.ordinal_suffix_of(day2.replace(/^0+/, ''))+" day of "+moment(date2.split("-")[1]).format('MMMM')+" "+date2.split("-")[0];
}

getArrangedName(cached):string{

  return cached.fname+" "+cached.mname.charAt(0).toUpperCase()+". "+cached.lname
}

getDeathTime(name):string{

  return moment(name,"h:mm").format('LT');

}
getDeathDate(name):String{
  return moment(name,"MMMM Do YYYY").format('LL');
}

getFormalDate(day):String{
  console.log(day)
  return moment(day).format('LL');
}

getBusinessAddress(cached):string{
  return cached.businessaddress
}
getBusinessName(cached):string{
  return cached.businessname
}
getFirstName(cached):string{
  return cached.ownersfname
}

getLastName(cached):string{
  return cached.ownerslastname
}
getEmaillAdd(cached):string{
  return cached.businessemail
}

}
