/* unversal selector function */

const $=function(selector){
   return document.querySelector(selector)
}

/* unversal selector function */

const $$=function(selector){
   return document.querySelectorAll(selector)
}



/*dinamick creat element */

const createElement=function(tagName,className,content){
   const newElement=document.createElement(tagName);
   if(className){
      newElement.setAttribute('class', className);
   }

   if(content){
      newElement.innerHTML=content
   }
   return newElement;
}


