import { pageExample01} from "./script/example01";
import { pageExample02 } from "./script/example02";
import { pageExample03 } from "./script/example03";
import { pageExample04 } from "./script/example04";
import { pageExample05 } from "./script/example05";
import { pageExample06 } from "./script/example06";

function init(){
  const page = document.querySelector("main")
  const pageId = page.getAttribute('id')
  if(pageId === 'main-01'){
    pageExample01()
  }else if(pageId === 'main-02'){
    pageExample02() 
  }else if(pageId === 'main-03'){
    pageExample03() 
  }else if(pageId === 'main-04'){
    pageExample04() 
  }else if(pageId === 'main-05'){
    pageExample05() 
  }else if(pageId === 'main-06'){
    pageExample06() 
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})