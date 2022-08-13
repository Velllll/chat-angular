import { Pipe, PipeTransform } from '@angular/core';
import { IUsers } from '../interfaces';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(users: IUsers[], search: string): IUsers[] {
    if(!search.length) return users 
    return users.filter(user => {
      return user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
    })
  }

}
