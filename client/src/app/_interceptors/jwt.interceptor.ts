import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);

  // take(1) methodu observable response'dan unsubscribe olma işlemini yapar. Böylece ilgili observable'a subscribe işlemi sürekli devam etmez ve gereksiz kaynak harcanmamış olur. Bu interceptor ile kullanıcının yetkilendirme işlemi yapılmış olur.
  accountService.currentUser$.pipe(take(1)).subscribe({
    next: user => {
      if(user){
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        })
      }
    }
  })

  return next(req);
};
