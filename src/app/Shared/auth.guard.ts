import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router,private _snackBar: MatSnackBar) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // si renvoie true ça dit que les routes associées à ce gardien sont navigables
    return this.authService.isAdmin()
    .then((admin):boolean => {
      //console.log("admin = " + admin + " type : " + (typeof admin))
      if(admin) {
        console.log("GARDIEN autorise la navigation, vous êtes bien un admin");
        return true;
      } else {
        // si pas admin on force la navigation vers la page d'accueil
        console.log("GARDIEN n'autorise pas la navigation, vous n'êtes pas admin");
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.verticalPosition = "bottom";
        this._snackBar.open("GARDIEN n'autorise pas la navigation, vous n'êtes pas admin","",config);
        this.router.navigate(["/home"]);
        return false;
      }
    })
  }

}
