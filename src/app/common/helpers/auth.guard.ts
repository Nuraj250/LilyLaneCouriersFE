import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import { UserService } from "../service/user.service";

/**
 *  Auth guard for check user logged in or not
 *
 * @param route Activated route details
 * @param state Router state
 */
export const authGuard = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.currentUserValue;
  if (!user){
    router.navigateByUrl('login', {replaceUrl: true, state: {isLogin: true}});
  }
  return true;
}
