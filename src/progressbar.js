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
    // console.log(to.path)
    var links = JSON.parse(window.localStorage.getItem('grupo'))
    console.log(links)

    // regra de validação de users
    if (links == null){
      return next()
    }else{

      for (let index = 0; index < links.length; index++) {
        if (to.path === links[index].link){
          ValidaLink = true
          tryInitProgress()
          return next()
       }  
      }
          if(ValidaLink){
            swal('Você não tem permissão', '','warning')
          }
      
    }   
  });

  router.afterEach(() => {
    // Complete the animation of the route progress bar.
    routeResolved = true;
    NProgress.done();
  });
}
