(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[,function(t,e,o){"use strict";o.r(e),o.d(e,"Tooltip",(function(){return s}));console.log("Tooltip running");class s extends class{constructor(t,e=!1){this.hostElement=t?document.getElementById(t):document.body,this.insertBefore=e}detach(){this.element&&this.element.remove()}attach(){this.hostElement.insertAdjacentElement(this.insertBefore?"afterbegin":"beforeend",this.element)}}{constructor(t,e,o){super(o),this.closeNotifier=t,this.text=e,this.create(),this.closeTooltip=()=>{this.detach(),this.closeNotifier()}}create(){const t=document.createElement("div");t.className="card";const e=document.getElementById("tooltip"),o=document.importNode(e.content,!0);o.querySelector("p").textContent=this.text,t.append(o);const s=this.hostElement.offsetLeft+20,n=this.hostElement.offsetTop+this.hostElement.clientHeight-this.hostElement.parentElement.scrollTop-10;t.style.position="absolute",t.style.left=s+"px",t.style.top=n+"px",t.addEventListener("click",this.closeTooltip),this.element=t}}}]]);
//# sourceMappingURL=1.821807cc1227e223e84b.js.map