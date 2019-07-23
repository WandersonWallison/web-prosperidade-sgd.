import NProgress from 'nprogress';
import swal from 'sweetalert2'
import { isRegExp } from 'util';
const progressShowDelay = 100;
let routeResolved = false;
let ValidaLink = false
/**
 * Initializes NProgress after a specified delay only if the route was not resolved yet.
 */
function tryInitProgress() {
  routeResolved = false;
  setTimeout(()=> {
    if (!routeResolved) {
      NProgress.start();
    }
  }, progressShowDelay);
}
export default function initProgress(router) {

  router.beforeEach((to, from, next) => {

    const links = JSON.parse(window.localStorage.getItem('links'));

    // regra de validação de users
    if (to.path === '/login' || to.path === '/admin/overview') {
      return next()
    } else {
        //console.log(links)
      if (links){
        for (let index = 0; index < links.length; index++) {
          if (to.path === links[index].link){
            ValidaLink = true
            tryInitProgress()
            return next()
         }
        }
      }
      if(ValidaLink){
         swal('Você não tem permissão', '','warning')
      }

    }
  })

  router.afterEach(() => {
    // Complete the animation of the route progress bar.
    routeResolved = true;
    NProgress.done();
  });
}
