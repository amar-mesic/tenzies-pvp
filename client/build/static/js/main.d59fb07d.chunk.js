(this.webpackJsonptenzies=this.webpackJsonptenzies||[]).push([[0],{40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},52:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var a=n(9),c=n.n(a),i=n(25),o=n.n(i),r=(n(39),n(40),n(41),n(42),n(2)),s=n(3),l=n(4),d=n(8),j=n(5),u=n(6),h=n(19),b=n(26),O=n.n(b),f=(n(43),n(44),n(0));function p(e){var t=e.value,n=e.isFrozen,a=e.handleClick,c=e.handleAnimationEnd,i=new Array(6).fill(Object(f.jsx)("div",{})).map((function(e,n){var c=(t+n-1)%6+1;return Object(f.jsx)("div",{id:"face-".concat(n+1),className:"cool-button die-face",onClick:a,children:c},Object(h.a)())}));return Object(f.jsx)("div",{className:"cube ".concat(n?"frozen":""),onAnimationEnd:c,"data-rolling":e.rolling&&!n?"true":"false",children:i})}n(46);function m(e){var t=e.ready,n=e.rolling,a=e.opponent,c=e.dieStates,i=e.handleFreeze,o=c.map((function(c){return Object(f.jsx)(p,{ready:t,rolling:n,value:c.value,isFrozen:c.isFrozen,handleClick:!a&&t?function(e){return i(e,c.id)}:function(){},handleAnimationEnd:a?function(){}:e.handleAnimationEnd},c.id)}));return Object(f.jsx)("div",{className:"dice-board ".concat(a?"opponent-board opacity-50":""),children:o})}n(47);function v(){return Object(f.jsx)("div",{className:"loader-inner m-auto",children:new Array(5).fill(Object(f.jsx)("div",{})).map((function(e){return t=Object(h.a)(),Object(f.jsx)("div",{className:"loader-line-wrap",children:Object(f.jsx)("div",{className:"loader-line"})},t);var t}))})}var x=function(e){Object(j.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state=a.defaultState(e),a.handleFreeze=a.handleFreeze.bind(Object(d.a)(a)),a.handleRoll=a.handleRoll.bind(Object(d.a)(a)),a.handleAnimationEnd=a.handleAnimationEnd.bind(Object(d.a)(a)),a.checkDone=a.checkDone.bind(Object(d.a)(a)),a.reset=a.reset.bind(Object(d.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.socket;t.on("player_joined",(function(){t.emit("send_init_state",e.state.diceBoard)})),t.on("receive_init_state",(function(n){e.state.oppReady||(e.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{oppReady:!0,oppState:n})})),t.emit("send_init_state",e.state.diceBoard))})),t.on("receive_move",(function(t){e.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{oppState:t})}),(function(){console.log("move received"),e.state.oppState.completed&&console.log("game lost")}))})),t.on("player_disconnecting",(function(){e.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{oppReady:!1})}))}))}},{key:"defaultState",value:function(e){var t=e.noOfDice;return{diceBoard:{dieStates:new Array(t).fill({id:"",value:Math.ceil(6*Math.random()),isFrozen:!1}).map((function(e){return{id:Object(h.a)(),value:Math.ceil(6*Math.random()),isFrozen:!1}})),completed:!1,rolling:!1},oppReady:!1,oppState:{dieStates:[],completed:!1,rolling:!1}}}},{key:"handleFreeze",value:function(e,t){var n=this;e.preventDefault(),this.setState((function(e){var n=e.diceBoard.dieStates.map((function(e){return t!==e.id?e:Object(r.a)(Object(r.a)({},e),{},{isFrozen:!e.isFrozen})}));return Object(r.a)(Object(r.a)({},e),{},{diceBoard:Object(r.a)(Object(r.a)({},e.diceBoard),{},{dieStates:n})})}),(function(){n.props.socket.emit("send_move",n.state.diceBoard),n.checkDone()}))}},{key:"checkDone",value:function(){var e=this;this.state.diceBoard.dieStates.every((function(t){return t.isFrozen&&e.state.diceBoard.dieStates[0].value===t.value}))&&this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{diceBoard:Object(r.a)(Object(r.a)({},e.diceBoard),{},{completed:!0})})}),(function(){return e.props.socket.emit("send_move",e.state.diceBoard)}))}},{key:"handleRoll",value:function(){var e=this;this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{diceBoard:Object(r.a)(Object(r.a)({},e.diceBoard),{},{dieStates:e.diceBoard.dieStates.map((function(e){return e.isFrozen?e:Object(r.a)(Object(r.a)({},e),{},{value:Math.ceil(6*Math.random())})})),rolling:!0})})}),(function(){e.props.socket.emit("send_move",e.state.diceBoard),console.log("button pressed. Dice rolling: ".concat(e.state.diceBoard.rolling))}))}},{key:"handleAnimationEnd",value:function(){var e=this;this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{diceBoard:Object(r.a)(Object(r.a)({},e.diceBoard),{},{rolling:!1})})}),(function(){console.log("animation ended. Dice rolling: ".concat(e.state.diceBoard.rolling))}))}},{key:"reset",value:function(){this.setState(this.defaultState(this.props))}},{key:"render",value:function(){var e=this.state.diceBoard,t=e.dieStates,n=e.completed,a=e.rolling,c=this.state.oppState,i=c.dieStates,o=c.completed,r=this.state.oppReady,s=!n&&o?Object(f.jsx)("dialog",{open:!0,onAnimationEnd:function(e){e.currentTarget.removeAttribute("open")},className:"you-lost-popup",children:Object(f.jsx)("h1",{children:"YOU LOST"})}):Object(f.jsx)(f.Fragment,{}),l=Object(f.jsx)("button",{className:"cool-button drop-shadow text-white ".concat(r?"":"opacity-50 cursor-not-allowed"),onClick:r?n||o?this.reset:this.handleRoll:function(){},children:n||o?"Start Again":"Roll"});return Object(f.jsxs)("div",{className:"main",children:[n&&!o&&Object(f.jsx)(O.a,{}),s,Object(f.jsx)("h1",{className:"title",children:"Tenzies"}),Object(f.jsx)("p",{className:"desc",children:"Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}),Object(f.jsx)("p",{className:"desc",children:"Try to finish before your opponent!"}),Object(f.jsxs)("div",{className:"dice-boards",children:[Object(f.jsx)("h2",{className:"player-header",children:"My Board"}),Object(f.jsx)("h2",{className:"player-header opponent",children:"Opponent's Board"}),Object(f.jsx)(m,{ready:r,opponent:!1,rolling:a,dieStates:t,handleFreeze:this.handleFreeze,handleAnimationEnd:this.handleAnimationEnd}),r?Object(f.jsx)(m,{ready:r,opponent:!0,rolling:!1,dieStates:i,handleFreeze:this.handleFreeze,handleAnimationEnd:this.handleAnimationEnd}):Object(f.jsxs)("div",{className:"m-auto",children:[Object(f.jsx)("p",{className:"opacity-50",children:"Waiting on Opponent"}),Object(f.jsx)(v,{})]})]}),l]})}}]),n}(c.a.Component),g=n(29);n(52);function y(e){return Object(f.jsx)("a",Object(r.a)({target:"_blank",rel:"noreferrer"},e))}var S=n(21),k=n(28);function B(){return Object(f.jsxs)("footer",{children:[Object(f.jsx)("p",{style:{textAlign:"center"},children:"Developer Contact Info"}),Object(f.jsxs)("ul",{className:"social-info",style:{listStyle:"none"},children:[Object(f.jsx)("li",{children:Object(f.jsx)(y,{href:"https://www.facebook.com/amar.mesic.100",children:Object(f.jsx)(S.a,{icon:["fab","facebook"]})})}),Object(f.jsx)("li",{children:Object(f.jsx)(y,{href:"#",children:Object(f.jsx)(S.a,{icon:["fab","instagram"]})})}),Object(f.jsx)("li",{children:Object(f.jsx)(y,{href:"https://github.com/amar-mesic",children:Object(f.jsx)(S.a,{icon:["fab","github"]})})}),Object(f.jsx)("li",{children:Object(f.jsx)(y,{href:"https://stackoverflow.com/users/14022782/amar-mesic",children:Object(f.jsx)(S.a,{icon:["fab","stack-overflow"]})})})]}),Object(f.jsx)("hr",{}),Object(f.jsx)("p",{className:"copyright",children:"Retto Inc. \xa9 2018"})]})}n(16).b.add(k.a);var z=Object(g.a)("http://localhost:3001");var F=function(){return Object(a.useEffect)((function(){z.on("connect",(function(){console.log("connected")})),z.on("first_player",(function(){console.log("I am the first player!")})),z.on("disconnect",(function(e){console.log("disconnected due to ".concat(e))}))}),[]),Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)("section",{className:"container",children:Object(f.jsx)(x,{noOfDice:10,socket:z})}),Object(f.jsx)(B,{})]})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,56)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),i(e),o(e)}))};o.a.createRoot(document.getElementById("root")).render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(F,{})})),N()}},[[55,1,2]]]);
//# sourceMappingURL=main.d59fb07d.chunk.js.map