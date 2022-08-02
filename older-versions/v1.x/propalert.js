class Propalert {
  constructor(title, options = {}, timeout = null) {
    this.innerHTML = title;
    this.timeLeft = timeout;
    this.timeoutFunction = null;
    var option = options;
    var timeoutposition = 3;
    if(new.target === undefined) { throw new Error('Failed to construct \'Propalert\': Please use the \'new\' operator, this DOM object constructor cannot be called as a function.'); }
    if (!(this.innerHTML) || this.innerHTML == "") { throw new Error('Failed to construct \'Propalert\': 1 argument required, but 0 present.'); }
    if (this.innerHTML && (typeof this.innerHTML !== 'string' || this.innerHTML.constructor !== String)) { throw new Error('Failed to construct \'Propalert\': The provided value at argument 1 is not of \'String\' type.'); }
    if (typeof option === 'number') { this.timeLeft = option; option = undefined; timeoutposition = 2; }
    if (option && (typeof option !== 'object' || option.constructor !== Object)) { throw new Error('Failed to construct \'Propalert\': The provided value at argument 2 is not of \'Object\' type.'); }
    if (this.timeLeft && (typeof this.timeLeft !== 'number' || this.timeLeft.constructor !== Number)) { throw new Error('Failed to construct \'Propalert\': The provided value at argument '+timeoutposition+' is not of \'Number\' type.'); }
    var p = this
      , o = (option || {})
      , text = (o.title || p.innerHTML)
      , theme = ((o.theme || o.style) || 'dark')
      , light = (o.light || false)
      , align = ((o.align || o.position) || 'left')
      , center = (o.center || false)
      , left = (o.left || false)
      , right = (o.right || false)
      , cancel = (((o.cancel || o.dismiss) || o.close) || false)
      , bannerclick = ((o.bannerclick || o.click) || false)
      , buttonopts = ((o.button || o.buttons) || undefined)
      , cancelevent = null
      , definebutton = function(n,o, jd = false) {
        var fntp = true;
        if (typeof o === 'undefined' || typeof o === 'boolean') {
          n.innerHTML = 'Ok';
        } else if (typeof o === 'string') {
          n.innerHTML = o;
        } else if (typeof o === 'object') {
          n.innerHTML = ((o.text || o.html) || 'Ok');
          var fn = ((((o.fn || o.fun) || o.perform) || o.function) || null);
          if (fn && typeof fn === 'function') {
            fntp = fn;
          }
          if (o.type) { n.type = o.type; }
        } else if (typeof o === 'function') {
          n.innerHTML = 'Ok';
          fntp = o;
        } else {
          n.innerHTML = 'Ok';
        }
        n.addEventListener('click', function(eve) { eve.stopPropagation(); eve.preventDefault(); p.close(fntp); }, true);
        n.setAttribute('ripple', 'rgba(66 133 244 / 70%)');
      }
      , defineStructure = function(no,op) {
        no.addEventListener('click', function(eve) { eve.stopPropagation(); eve.preventDefault(); p.close(); }, true);
      }
      , defineStructureDismiss = function(no,op) {
        no.addEventListener('click', function(eve) { eve.stopPropagation(); eve.preventDefault(); p.close(); }, true);
        no.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>';
        if (typeof op === 'function') {
          cancelevent = op;
        }
      }
      , a = document.createElement('alert')
      , b = document.createElement('div')
      , c = document.createElement('div')
      , d = document.createElement('div')
      , e = document.createElement('div')
      , f = document.createElement('button')
      , g = document.createElement('button');
    if (light) { theme = 'light' }
    //if (this.timeLeft == null && cancel === false) { cancel = true; }
    if (left !== false && right == false && center == false) {
      align = 'left';
    } else if (left == false && right !== false && center == false) {
      align = 'right';
    } else if (left == false && right == false && center !== false) {
      align = 'center';
    }
    a.setAttribute('__prop','');
    a.style.cssText = 'bottom: 0; opacity: 0;';
    a.setAttribute('dlg', align);
    a.setAttribute('dth', theme);
    b.classList.add('__prop_mild');
    c.classList.add('__prop_extn');
    d.classList.add('__prop_text');
    e.classList.add('__prop_ctir');
    f.type = 'dismiss';
    g.type = 'button';
    a.appendChild(b);
    b.appendChild(c);
    b.appendChild(e);
    c.appendChild(d);
    d.innerHTML = text;
    if (typeof buttonopts === 'string' || typeof buttonopts === 'function' || (typeof buttonopts === 'object' && !(Object.prototype.toString.call(buttonopts) == '[object Array]'))) {
      e.appendChild(g);
      definebutton(g,buttonopts);
    } else if ((typeof buttonopts === 'object' && Object.prototype.toString.call(buttonopts) == '[object Array]')) {
      buttonopts.forEach((btk) => {
        var h = g.cloneNode();
        e.appendChild(h);
        definebutton(h,btk);
      });
    }
    if (cancel !== false) { e.appendChild(f); }
    defineStructureDismiss(f,cancel);
    document.body.appendChild(a);
    this.nodeElement = {
      a : a,
      b : d
    }
    this.innerText = d.textContent;
    this.cancelEvent = cancelevent;
    this.animateElement();
    if (p.timeLeft !== null) { this.timeoutFunction = setTimeout(function () {p.close();}, p.timeLeft); }
    if (typeof bannerclick === 'boolean' && bannerclick === true) {
      c.classList.add('__prop_bnck');
      c.addEventListener('click', function(event) { p.close(); }, true);
    }
  }
  animateElement() {
    var p = this;
    window.dispatchEvent(new Event('resize'));
    p.nodeElement.a.style.opacity = '1';
  }
  bannerClick() {
    var p = this;
    p.close();
  }
  callback(cbk = null) {
    setTimeout(cbk);
  }
  callbackEvent(cbk = null) {
    var p = this;
    p.callback(cbk);
  }
  cancel(fn = null) {
    var p = this;
    p.dismiss(fn);
  }
  close(cbk = null) {
    var p = this, item = p.nodeElement.a;
    item.style.opacity = '0';
    p.removeElement();
    if (cbk) {
      p.callback(cbk);
    } else {
      if (p.cancelEvent) {
        p.callback(p.cancelEvent);
        p.cancelEvent = null;
      }
    }
  }
  dismiss(fn = null) {
    var p = this;
    p.cancelEvent = fn;
  }
  oncancel(fn = null) {
    var p = this;
    p.dismiss(fn);
  }
  onclose(fn = null) {
    var p = this;
    p.dismiss(fn);
  }
  remove(cbk = null) {
    var p = this;
    p.close(cbk);
  }
  removeElement() {
    var p = this;
    var node = p.nodeElement.a;
    setTimeout(function () {
      if (node) {
        var parent = node.parentNode;
        if (parent && parent.contains(node)) {
          parent.removeChild(node);
        }
      }
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
  text(ttl = "") {
    var p = this;
    p.title(ttl);
  }
  theme(th = "") {
    var p = this;
    p.nodeElement.a.setAttribute('dth', th);
  }
  time(tmo = null) {
    var p = this;
    p.timeout(tmo);
  }
  timeout(tmo = null) {
    if (!(tmo) && tmo !== 0) { throw new Error('Failed to reset timeout for \'Propalert\':  1 argument required, but 0 present.'); }
    if ((typeof tmo !== 'number' || tmo.constructor !== Number)) { throw new Error('Failed to reset timeout for \'Propalert\': The provided value is not of \'Number\' type.'); }
    var p = this;
    clearTimeout(p.timeoutFunction);
    p.timeLeft = tmo;
    p.timeoutFunction = setTimeout(function () {p.close();}, p.timeLeft);
  }
  title(ttl = "") {
    if (!(ttl) || ttl == "") { throw new Error('Failed to reset title of \'Propalert\': 1 argument required, but 0 present.'); }
    var p = this;
    p.innerHTML = ttl;
    p.nodeElement.b.innerHTML = ttl;
    window.dispatchEvent(new Event('resize'));
  }
};

window.addEventListener('resize', function() {
  var listHeight = 0;
  document.querySelectorAll('alert[__prop]').forEach((itk) => {
    listHeight += itk.clientHeight + 10;
  });
  document.querySelectorAll('alert[__prop]').forEach((itk,i) => {
    listHeight -= itk.clientHeight;
    itk.style.bottom = (listHeight) + 'px';
    listHeight -= 10;
    itk.dataset.id = i;
  });
}, true);
(function() {
  var a = `@import url("/utilities/apis-font/index.css");@import url("/utilities/web-icons/index.css");alert[__prop] {display: block;position: fixed;bottom: 10px;left: 10px;background: #121212;border-radius: 4px;max-width: calc(100% - 20px);color: #ffffff;transition: 0.2s;z-index: 1111111;font-family: "Poppins", "Segoe Alt Regular", sans-serif;-webkit-tap-highlight-color: transparent;box-sizing: border-box;border: 1px solid rgba(0,0,0,.2);box-shadow: 0 0 16px rgb(0 0 0 / 12%), 0 16px 16px rgb(0 0 0 / 24%);}alert[__prop] * {-webkit-tap-highlight-color: transparent;box-sizing: border-box;font-family: "Poppins", "Segoe Alt Regular", sans-serif;}alert[__prop][dth="dark"], alert[__prop][dth="default"], alert[__prop][dth="inherit"] {border: 1px solid rgba(0,0,0,.2);box-shadow: 0 0 16px rgb(0 0 0 / 12%), 0 16px 16px rgb(0 0 0 / 24%);background: #121212;color: #ffffff;}alert[__prop][dth="light"] {border: 1px solid rgba(200,200,200,.4);box-shadow: 0 0 16px rgb(50 50 50 / 12%), 0 16px 16px rgb(50 50 50 / 24%);background: #ffffff;color: #121212;}alert[__prop][dlg="default"], alert[__prop][dlg="inherit"], alert[__prop][dlg="left"] {left: 10px;}alert[__prop][dlg="center"] {left: 50%;transform: translateX(-50%);}alert[__prop][dlg="right"] {right: 10px;left: auto;}alert[__prop] .__prop_mild {display: flex;flex-direction: row;flex-wrap: nowrap;width: 100%;}alert[__prop] .__prop_mild .__prop_extn {display: flex;flex-grow: 3;width: 100%;flex-direction: column;flex-wrap: nowrap;padding: 2px 16px;}alert[__prop] .__prop_mild .__prop_extn .__prop_text {display: block;width: 100%;white-space: pre-wrap;word-wrap: break-word;font-size: 15px;padding: 10px 0;font-weight: 400;color: inherit;max-height: calc(100vh - 46px);max-height: calc(var(--vh, 1vh) * 100 - 46px);overflow: hidden auto;}alert[__prop] .__prop_mild .__prop_extn .__prop_text::-webkit-scrollbar {width: 16px;}alert[__prop] .__prop_mild .__prop_extn .__prop_text::-webkit-scrollbar-thumb {background: #727888;background-clip: padding-box;border: 4px solid transparent;-webkit-border-radius: 8px;border-radius: 8px;-webkit-box-shadow: none;box-shadow: none;}alert[__prop][dth="light"] .__prop_mild .__prop_extn .__prop_text::-webkit-scrollbar-thumb {background: #dadce0;background-clip: padding-box;border: 4px solid transparent;-webkit-border-radius: 8px;border-radius: 8px;-webkit-box-shadow: none;box-shadow: none;}alert[__prop] .__prop_mild .__prop_extn .__prop_text::-webkit-scrollbar-track {background: none;border: none;}alert[__prop] .__prop_mild .__prop_extn.__prop_bnck {cursor: pointer;user-select: none;}alert[__prop] .__prop_mild .__prop_ctir {display: flex;flex-direction: row;flex-grow: 1;flex-wrap: nowrap;min-height: 100%;padding: 0 10px 0 0;justify-content: center;align-items: center;}@media screen and (max-width: 400px) {alert[__prop] .__prop_mild .__prop_ctir {flex-wrap: wrap;}}alert[__prop] .__prop_mild .__prop_ctir button {display: flex;width: auto;padding: 5px 10px;justify-content: center;align-items: center;margin: 5px;font-size: 15px;font-weight: inherit;background: inherit;border-radius: 2px;color: #08f;cursor: pointer;border: 1px solid transparent;transition: 0.2s;box-sizing: border-box;font-family: "Poppins", "Segoe Alt Regular", sans-serif;}alert[__prop] .__prop_mild .__prop_ctir button[type="dismiss"] {padding: 0;border: none;height: 30px;min-height: 30px;max-width: 30px;width: 30px;min-width: 30px;max-width: 30px;}alert[__prop] .__prop_mild .__prop_ctir button[type="dismiss"] svg {fill: #aaaaaa;width: 22px;height: 22px;}alert[__prop] .__prop_mild .__prop_ctir button:hover {background: rgba(255, 255, 255, 10%);}alert[__prop][dth="light"] .__prop_mild .__prop_ctir button:hover {background: rgba(0, 0, 0, 10%);}`
      , b = new Blob([a], {type: 'text/css'})
      , c = document.createElement('link');
  c.rel = 'stylesheet';
  c.href = window.URL.createObjectURL(b);
  c.setAttribute('module', 'propalert');
  document.head.appendChild(c);
})();
