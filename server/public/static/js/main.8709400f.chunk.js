(this.webpackJsonptenzies=this.webpackJsonptenzies||[]).push([[0],{40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},52:function(e,t,n){},55:function(e,t,n){"use strict";n.r(t);var a=n(9),c=n.n(a),i=n(25),o=n.n(i),r=(n(39),n(40),n(41),n(42),n(2)),s=n(3),l=n(4),d=n(8),j=n(5),u=n(6),b=n(19),h=n(26),p=n.n(h),O=(n(43),n(44),n(0));function f(e){var t=e.value,n=e.isFrozen,a=e.handleClick,c=e.handleAnimationEnd,i=new Array(6).fill(Object(O.jsx)("div",{})).map((function(e,n){var c=(t+n-1)%6+1;return Object(O.jsx)("div",{id:"face-".concat(n+1),className:"cool-button die-face",onClick:a,children:c},Object(b.a)())}));return Object(O.jsx)("div",{className:"cube ".concat(n?"frozen":""),onAnimationEnd:c,"data-rolling":e.rolling&&!n?"true":"false",children:i})}n(46);function m(e){var t=e.ready,n=e.rolling,a=e.opponent,c=e.dieStates,i=e.handleFreeze,o=c.map((function(c){return Object(O.jsx)(f,{ready:t,rolling:n,value:c.value,isFrozen:c.isFrozen,handleClick:!a&&t?function(e){return i(e,c.id)}:function(){},handleAnimationEnd:a?function(){}:e.handleAnimationEnd},c.id)}));return Object(O.jsx)("div",{className:"dice-board ".concat(a?"opponent-board opacity-50":""),children:o})}n(47);function v(){return Object(O.jsx)("div",{className:"loader-inner m-auto",children:new Array(5).fill(Object(O.jsx)("div",{})).map((function(e){return t=Object(b.a)(),Object(O.jsx)("div",{className:"loader-line-wrap",children:Object(O.jsx)("div",{className:"loader-line"})},t);var t}))})}var x=function(e){Object(j.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state=a.defaultState(e),a.handleFreeze=a.handleFreeze.bind(Object(d.a)(a)),a.handleRoll=a.handleRoll.bind(Object(d.a)(a)),a.handleAnimationEnd=a.handleAnimationEnd.bind(Object(d.a)(a)),a.checkDone=a.checkDone.bind(Object(d.a)(a)),a.reset=a.reset.bind(Object(d.a)(a)),a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=this.props.socket;t.on("player_joined",(function(){t.emit("send_init_state",e.state.diceBoard)})),t.on("receive_init_state",(function(n){e.state.oppReady||(e.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{oppReady:!0,oppState:n})})),t.emit("send_init_state",e.state.diceBoard))})),t.on("receive_move",(function(t){e.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{oppState:t})}),(function(){console.log("move received"),e.state.oppState.completed&&console.log("game lost")}))})),t.on("player_disconnecting",(function(){e.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{oppReady:!1})}))}))}},{key:"defaultState",value:function(e){var t=e.noOfDice;return{diceBoard:{dieStates:new Array(t).fill({id:"",value:Math.ceil(6*Math.random()),isFrozen:!1}).map((function(e){return{id:Object(b.a)(),value:Math.ceil(6*Math.random()),isFrozen:!1}})),completed:!1,rolling:!1},oppReady:!1,oppState:{dieStates:[],completed:!1,rolling:!1}}}},{key:"handleFreeze",value:function(e,t){var n=this;e.preventDefault(),this.setState((function(e){var n=e.diceBoard.dieStates.map((function(e){return t!==e.id?e:Object(r.a)(Object(r.a)({},e),{},{isFrozen:!e.isFrozen})}));return Object(r.a)(Object(r.a)({},e),{},{diceBoard:Object(r.a)(Object(r.a)({},e.diceBoard),{},{dieStates:n})})}),(function(){n.props.socket.emit("send_move",n.state.diceBoard),n.checkDone()}))}},{key:"checkDone",value:function(){var e=this;this.state.diceBoard.dieStates.every((function(t){return t.isFrozen&&e.state.diceBoard.dieStates[0].value===t.value}))&&this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{diceBoard:Object(r.a)(Object(r.a)({},e.diceBoard),{},{completed:!0})})}),(function(){return e.props.socket.emit("send_move",e.state.diceBoard)}))}},{key:"handleRoll",value:function(){var e=this;this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{diceBoard:Object(r.a)(Object(r.a)({},e.diceBoard),{},{dieStates:e.diceBoard.dieStates.map((function(e){return e.isFrozen?e:Object(r.a)(Object(r.a)({},e),{},{value:Math.ceil(6*Math.random())})})),rolling:!0})})}),(function(){e.props.socket.emit("send_move",e.state.diceBoard),console.log("button pressed. Dice rolling: ".concat(e.state.diceBoard.rolling))}))}},{key:"handleAnimationEnd",value:function(){var e=this;this.setState((function(e){return Object(r.a)(Object(r.a)({},e),{},{diceBoard:Object(r.a)(Object(r.a)({},e.diceBoard),{},{rolling:!1})})}),(function(){console.log("animation ended. Dice rolling: ".concat(e.state.diceBoard.rolling))}))}},{key:"reset",value:function(){this.setState(this.defaultState(this.props))}},{key:"render",value:function(){var e=this.state.diceBoard,t=e.dieStates,n=e.completed,a=e.rolling,c=this.state.oppState,i=c.dieStates,o=c.completed,r=this.state.oppReady,s=!n&&o?Object(O.jsx)("dialog",{open:!0,onAnimationEnd:function(e){e.currentTarget.removeAttribute("open")},className:"you-lost-popup",children:Object(O.jsx)("h1",{children:"YOU LOST"})}):Object(O.jsx)(O.Fragment,{}),l=Object(O.jsx)("button",{className:"cool-button drop-shadow text-white min-w-fit py-4 px-6 ".concat(r?"":"opacity-50 cursor-not-allowed "),onClick:r?n||o?this.reset:this.handleRoll:function(){},children:n||o?"Start Again":"Roll"});return Object(O.jsxs)("div",{className:"main",children:[n&&!o&&Object(O.jsx)(p.a,{}),s,Object(O.jsx)("h1",{className:"title",children:"Tenzies"}),Object(O.jsx)("p",{className:"desc",children:"Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}),Object(O.jsx)("p",{className:"desc",children:"Try to finish before your opponent!"}),Object(O.jsxs)("div",{className:"dice-boards",children:[Object(O.jsxs)("div",{className:"player-board",children:[Object(O.jsx)("h2",{className:"player-header",children:"My Board"}),Object(O.jsx)(m,{ready:r,opponent:!1,rolling:a,dieStates:t,handleFreeze:this.handleFreeze,handleAnimationEnd:this.handleAnimationEnd})]}),Object(O.jsxs)("div",{className:"player-board",children:[Object(O.jsx)("h2",{className:"player-header opponent",children:"Opponent's Board"}),r?Object(O.jsx)(m,{ready:r,opponent:!0,rolling:!1,dieStates:i,handleFreeze:this.handleFreeze,handleAnimationEnd:this.handleAnimationEnd}):Object(O.jsxs)("div",{className:"m-auto pt-4",children:[Object(O.jsx)("p",{className:"opacity-50",children:"Waiting on Opponent"}),Object(O.jsx)(v,{})]})]})]}),l]})}}]),n}(c.a.Component),y=n(29);n(52);function g(e){return Object(O.jsx)("a",Object(r.a)({target:"_blank",rel:"noreferrer"},e))}var S=n(21),k=n(28);function B(){return Object(O.jsxs)("footer",{children:[Object(O.jsx)("p",{style:{textAlign:"center"},children:"Developer Contact Info"}),Object(O.jsxs)("ul",{className:"social-info",style:{listStyle:"none"},children:[Object(O.jsx)("li",{children:Object(O.jsx)(g,{href:"https://www.facebook.com/amar.mesic.100",children:Object(O.jsx)(S.a,{icon:["fab","facebook"]})})}),Object(O.jsx)("li",{children:Object(O.jsx)(g,{href:"#",children:Object(O.jsx)(S.a,{icon:["fab","instagram"]})})}),Object(O.jsx)("li",{children:Object(O.jsx)(g,{href:"https://github.com/amar-mesic",children:Object(O.jsx)(S.a,{icon:["fab","github"]})})}),Object(O.jsx)("li",{children:Object(O.jsx)(g,{href:"https://stackoverflow.com/users/14022782/amar-mesic",children:Object(O.jsx)(S.a,{icon:["fab","stack-overflow"]})})})]}),Object(O.jsx)("hr",{}),Object(O.jsx)("p",{className:"copyright",children:"Retto Inc. \xa9 2018"})]})}n(16).b.add(k.a);var N=Object(y.a)();var z=function(){return Object(a.useEffect)((function(){N.on("connect",(function(){console.log("connected")})),N.on("first_player",(function(){console.log("I am the first player!")})),N.on("disconnect",(function(e){console.log("disconnected due to ".concat(e))}))}),[]),Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)("section",{className:"my-container",children:Object(O.jsx)(x,{noOfDice:10,socket:N})}),Object(O.jsx)(B,{})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,56)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),i(e),o(e)}))};o.a.createRoot(document.getElementById("root")).render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(z,{})})),F()}},[[55,1,2]]]);
//# sourceMappingURL=main.8709400f.chunk.js.map