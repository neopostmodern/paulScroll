function PaulScroll(selector, animationDuration = 500) {
  if (selector == null) {
    console.error("Undefined selector for PaulScroll");
  }

  let sections = document.querySelectorAll(selector);
  let oldSectionIndex = 0;
  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    window['s' + sectionIndex] = sections[sectionIndex];
  }

  let jumpRateLimiter = null;
  function jumpTo(sectionIndex) {
    console.log("Executing change to " + sectionIndex);
    $("html, body").animate(
      { scrollTop: $(sections[sectionIndex]).offset().top },
      {
        done: function () { console.log("Smooth scroll done.") },
        duration: animationDuration,
        easing: 'swing'
      }
    ); //, { duration: 100 });
    // console.log(sections[sectionIndex].offsetTop - window.scrollY);
    // window.scrollBy(0, Math.max(10, (sections[sectionIndex].offsetTop - window.scrollY) / 10));
    // // sections[sectionIndex].scrollIntoView({behavior: "smooth"}); // block: "start",
    //
    // window.setTimeout(function () {
    //   let top = sections[sectionIndex].offsetTop < window.scrollY; // + 5; //  + window.innerHeight;
    //   if (!top) {
    //     jumpTo(sectionIndex);
    //   }
    // }, 5);
  }

  function requestJumpTo(sectionIndex) {
    console.log("Triggered change to " + sectionIndex);
    if (oldSectionIndex != sectionIndex) {
      jumpTo(sectionIndex);
    }
    oldSectionIndex = sectionIndex;

    // if (jumpRateLimiter) {
    //   clearTimeout(jumpRateLimiter);
    // }
    // jumpRateLimiter = setTimeout(function () {
    //   if (oldSectionIndex != sectionIndex) {
    //     jumpTo(sectionIndex);
    //   }
    //   oldSectionIndex = sectionIndex;
    //   jumpRateLimiter = null;
    // }, 20);
  }

  let oldScrollPositionY = 0;
  document.addEventListener('scroll', function (event) {
    event.preventDefault();
    let peaking = 0;
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      let topLineVisible = sections[sectionIndex].offsetTop < window.scrollY + window.innerHeight;
      if (topLineVisible) {
        peaking = sectionIndex;
      }
    }
    if (oldScrollPositionY <= window.scrollY) {
      // scrolling down, trigger effect
      requestJumpTo(peaking);
    } else {
      // scrolling up, no transitions
      console.log("[Up] Silently changed to " + peaking);
      oldSectionIndex = peaking;
    }

    oldScrollPositionY = window.scrollY;
  })
}