context-dashboard
=================

---

####personal context manager - track your time and projects - client side js chrono dashboard

---

Do you find yourself getting sidetracked; having trouble completing tasks?

This web app lets you keep track of time

First commit 07.22.12 therealplato

### Usage
Open `index.html` in a browser that supports localstorage

A web dashboard remembers a set of 'contexts' which are just labels, I am using
them to track projects, afk, sleep, internet, games.

Total time accumulated is shown for each context. Click a context to switch to
it and start timing. The current context is highlighted and shows current time
delta.

### Todo
* add pause button
* sexify css
* allow rename contexts
* test on phone
* make enter button add new context in addition to clicking button
* allow multiple simultaneous contexts
* organize contexts - folders, groups, parents?
* add timecoded notes and alarms: 
    11:30 started mining in eve
    2:30 stopped mining and started building context switcher
    2:35 put coffee on, 20m timer
* allow backup/import/gzip of localhost.wizState object

### Internals
window.onload instantiates one ctxManager, which contains a `state` property.

It then calls `ctxManager.init()`, which loads `state` from localstorage or
hardcoded defaults, then fires the first `.tick()`, which sets a timeout to call
`.tick()` once per second. 

Every tick we update DOM and save `ctxManager.state` into localstorage.

We store one string value in localstorage, with the key wizState, it is a JSON
stringified copy of `ctxManager.state`, i.e.:

    var state = 
    {
      contexts:
      [
        {name:'eve', id=0, totaltime=61000}, // 1m1s
        {name:'work', id=1, totaltime=7000}  // 7s
      ],

      timeline:
      [
        {
          start:'Sat Jun 23 2012 09:06:27 GMT-0400 (EDT)',
          end: 'Sat Jun 23 2012 12:06:27 GMT-0400 (EDT)',
          ctxID:0
        },
        { 
          start: 'Sat Jun 23 2012 12:06:27 GMT-0400 (EDT)',
          end:'Sat Jun 23 2012 18:06:27 GMT-0400 (EDT)',
          ctxID:1
        },
        {
          start:'Sat Jun 23 2012 18:06:27 GMT-0400 (EDT)',
          end: null,
          ctxID:0
        },  // just after switching contexts, before 1s tick() sets end
      ]
    }

