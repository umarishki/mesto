(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._likesNumber=e.likesNumber,this._ID=e.ID,this._ownerID=e.ownerID,this._cardTemplateSelector=n,this._openPopupFunc=r,this._userInfo=o,this._popupConfirmDeletion=i,this._apiChangeLike=a}var n,r;return n=t,(r=[{key:"getCard",value:function(){return this._cardElement=this._getTemplate(),this._cardImage=this._cardElement.querySelector(".cards__image"),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._likesNumberElement=this._cardElement.querySelector(".cards__likes-number"),this.setLikesNumber(this._likesNumber),this._buttonLikeCard=this._cardElement.querySelector(".cards__like-icon"),this._deleteIcon=this._cardElement.querySelector(".cards__delete-icon"),this._userInfo.getId()!==this._ownerID&&this._deleteIcon.remove(),this._cardTitle=this._cardElement.querySelector(".cards__title"),this._cardTitle.textContent=this._name,this._addEventListeners(),this._cardElement}},{key:"_getTemplate",value:function(){return document.querySelector(this._cardTemplateSelector).content.querySelector(".cards__item").cloneNode(!0)}},{key:"deleteCard",value:function(){this._cardElement.remove()}},{key:"_changeLikeCardIcon",value:function(){this._buttonLikeCard.classList.contains("cards__like-icon_active")?(this._buttonLikeCard.classList.remove("cards__like-icon_active"),this._apiChangeLike(this,"delete")):(this._buttonLikeCard.classList.add("cards__like-icon_active"),this._apiChangeLike(this,"add"))}},{key:"setLikesNumber",value:function(e){this._likesNumberElement.textContent=e}},{key:"_addEventListeners",value:function(){var e=this;this._deleteIcon.addEventListener("click",(function(){e._popupConfirmDeletion.setEventListenerForConfirmPopup((function(){return e.deleteCard()})),e._popupConfirmDeletion.open()})),this._buttonLikeCard.addEventListener("click",(function(){e._changeLikeCardIcon()})),this._cardImage.addEventListener("click",(function(){return e._openPopupFunc(e._name,e._link)}))}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selectorsObj=t,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._selectorsObj.inputSelector)),this._buttonElement=this._formElement.querySelector(this._selectorsObj.submitButtonSelector)}var t,r;return t=e,(r=[{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){e.changeButtonState(),t.addEventListener("input",(function(){e._isValid(t),e.changeButtonState()}))}))}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._selectorsObj.inputErrorClass),n.classList.add(this._selectorsObj.errorClass),n.textContent=t}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._selectorsObj.inputErrorClass),t.classList.remove(this._selectorsObj.errorClass),t.textContent=""}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"resetValidation",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"changeButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.setAttribute("disabled",!0),this._buttonElement.classList.add(this._selectorsObj.inactiveButtonClass)):(this._buttonElement.removeAttribute("disabled"),this._buttonElement.classList.remove(this._selectorsObj.inactiveButtonClass))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._container=document.querySelector(n),this._renderer=t}var t,n;return t=e,(n=[{key:"renderInitialElements",value:function(e){var t=this;this._items=e,this._items.forEach((function(e){t.addItem(e)}))}},{key:"addItem",value:function(e){var t=this._renderer(e);this._container.prepend(t)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._closeByClickOverlay=this._closeByClickOverlay.bind(this),this._closeByClickCross=this._closeByClickCross.bind(this),this.btnSubmit=this._popup.querySelector(".popup__button")}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_closeByClickOverlay",value:function(e){e.target===e.currentTarget&&this.close()}},{key:"_closeByClickCross",value:function(){this.close()}},{key:"setEventListeners",value:function(){this._popup.addEventListener("click",this._closeByClickOverlay),this._popup.querySelector(".popup__close").addEventListener("click",this._closeByClickCross)}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function _(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=h(r);if(o){var n=h(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._imageCardPreview=t._popup.querySelector(".popup__img-preview"),t._titleCardPreview=t._popup.querySelector(".popup__preview-title"),t}return t=a,(n=[{key:"open",value:function(e,t){this._titleCardPreview.textContent=e,this._imageCardPreview.alt=e,this._imageCardPreview.src=t,l(h(a.prototype),"open",this).call(this)}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=k(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},b.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}function g(e,t){return g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},g(e,t)}function E(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return w(e)}function w(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function a(e,t){var n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._form=n._popup.querySelector(".popup__form"),n._inputs=function(e){if(Array.isArray(e))return m(e)}(r=n._form.querySelectorAll(".popup__input"))||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),n._submitFormFunc=t,n._submitCallbackWithBind=n._submitCallback.bind(w(n)),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputs.forEach((function(t){e[t.name]=t.value})),e}},{key:"setEventListeners",value:function(){b(C(a.prototype),"setEventListeners",this).call(this),this._submitFormFunc&&this._form.addEventListener("submit",this._submitCallbackWithBind)}},{key:"setEventListenerForConfirmPopup",value:function(e){var t=this;this._form.addEventListener("submit",(function(){e(),t.close()}))}},{key:"_submitCallback",value:function(e){this._submitFormFunc&&this._submitFormFunc(e,this._getInputValues())}},{key:"close",value:function(){b(C(a.prototype),"close",this).call(this),this._form.reset()}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(u);function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var O=function(){function e(t){var n=t.profileNameSelector,r=t.profileOccupationSelector,o=t.profileImageSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._occupationElement=document.querySelector(r),this._imageElement=document.querySelector(o),this._id=null}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,occupation:this._occupationElement.textContent}}},{key:"setUserInfo",value:function(e,t){this._nameElement.textContent=e,this._occupationElement.textContent=t}},{key:"setId",value:function(e){this._id=e}},{key:"getId",value:function(){return this._id}},{key:"setUserImage",value:function(e){this._imageElement.src=e}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var j=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._authorization=t.headers.authorization,this._contentType=t.headers["Content-Type"]}var t,n;return t=e,(n=[{key:"_request",value:function(e,t,n,r,o){var i=this;fetch("".concat(this._baseUrl).concat(t),{method:e,headers:{authorization:this._authorization,"Content-Type":"application/json"},body:n?JSON.stringify(n):void 0}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then(r).catch((function(e){console.log(e),o&&i.setNotLoading(o)}))}},{key:"_setLoading",value:function(e){e.textContent="Сохранение..."}},{key:"setNotLoading",value:function(e){e.textContent="Сохранить"}},{key:"getInitialCards",value:function(e){this._request("GET","cards","",e,null)}},{key:"getProfileInfo",value:function(e){this._request("GET","users/me","",e,null)}},{key:"postNewCard",value:function(e,t,n){this._setLoading(t),this._request("POST","cards",{name:e["place-name"],link:e.link},n,t)}},{key:"patchProfileInfo",value:function(e,t,n){var r=e.name,o=e.occupation;this._setLoading(t),this._request("PATCH","users/me",{name:r,about:o},n,t)}},{key:"patchProfileAvatar",value:function(e,t,n){this._setLoading(t),this._request("PATCH","users/me/avatar",{avatar:e.link},n,t)}},{key:"deleteLike",value:function(e,t){this._request("DELETE","cards/".concat(e,"/likes"),"",t,null)}},{key:"putLike",value:function(e,t){this._request("PUT","cards/".concat(e,"/likes"),"",t,null)}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),P=document.querySelector(".popup__form_type_edit-profile"),q=document.querySelector(".profile-info__edit-btn"),T=document.querySelector(".popup__input_field_name"),B=document.querySelector(".popup__input_field_occupation"),D=document.querySelector(".popup__form_type_add-card"),A=document.querySelector(".profile__add-btn"),N=document.querySelector(".popup__form_type_edit-avatar"),R=document.querySelector(".profile__edit-image"),x=new d(".popup_type_card-preview");x.setEventListeners();var U=new S(".popup_type_edit-profile",(function(e,t){e.preventDefault(),J.patchProfileInfo(t,U.btnSubmit,(function(e){H.setUserInfo(e.name,e.about),J.setNotLoading(U.btnSubmit),U.close()}))}));U.setEventListeners();var F=new S(".popup_type_add-card",(function(e,t){e.preventDefault(),J.postNewCard(t,F.btnSubmit,(function(e){M.addItem({name:e.name,link:e.link,likesNumber:e.likes.length,ID:e._id,ownerID:e.owner._id}),J.setNotLoading(F.btnSubmit),F.close()}))}));F.setEventListeners();var V=new S(".popup_type_edit-avatar",(function(e,t){e.preventDefault(),J.patchProfileAvatar(t,V.btnSubmit,(function(e){H.setUserImage(e.avatar),J.setNotLoading(V.btnSubmit),V.close()}))}));V.setEventListeners();var z=new S(".popup_type_confirm-deletion",void 0);z.setEventListeners(),q.addEventListener("click",(function(){var e=H.getUserInfo(),t=e.name,n=e.occupation;T.value=t,B.value=n;var r=P.getAttribute("name"),o=W[r];o.resetValidation(),o.changeButtonState(),U.open()})),A.addEventListener("click",(function(){var e=D.getAttribute("name"),t=W[e];t.resetValidation(),t.changeButtonState(),F.open()})),R.addEventListener("click",(function(){var e=N.getAttribute("name"),t=W[e];t.resetValidation(),t.changeButtonState(),V.open()}));var G,H=new O({profileNameSelector:".profile-info__title",profileOccupationSelector:".profile-info__subtitle",profileImageSelector:".profile__image"}),M=new i((function(e){return new t(e,"#card",K,H,z,$).getCard()}),".cards-container"),W={};G={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(G.formSelector)).forEach((function(e){var t=new r(G,e),n=e.getAttribute("name");W[n]=t,t.enableValidation()}));var J=new j({baseUrl:"https://nomoreparties.co/v1/cohort-39/",headers:{authorization:"a7defb5f-ab84-4cfb-b754-de71ce92f20a","Content-Type":"application/json"}});function $(e,t){"delete"===t?J.deleteLike(e._ID,(function(t){e.setLikesNumber(t.likes.length)})):J.putLike(e._ID,(function(t){e.setLikesNumber(t.likes.length)}))}function K(e,t){x.open(e,t)}J.getProfileInfo((function(e){H.setUserInfo(e.name,e.about),H.setUserImage(e.avatar),H.setId(e._id)})),J.getInitialCards((function(e){var t=[];e.forEach((function(e){t.push({name:e.name,link:e.link,likesNumber:e.likes.length,ID:e._id,ownerID:e.owner._id})})),M.renderInitialElements(t)}))})();