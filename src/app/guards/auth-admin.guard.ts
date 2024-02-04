import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import { Observable, catchError, map, of } from 'rxjs';

export const authAdminGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const token = sessionStorage.getItem('user-token');

  if (!token) return of(false);

  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  return authenticationService.access(token).pipe(
    map(token => {
      if (token.data.roleId === 1) {
        return true;
      } else {
        return false
      }
    }),
    catchError((err) => {
      router.navigate(['/']);
      return of(false);
    })
  ); 
};
