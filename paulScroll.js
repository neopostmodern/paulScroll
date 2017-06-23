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
  function jumpTo(sectionIndex, reverse) {
    let section = $(sections[sectionIndex]);
    let scrollTop = section.offset().top;
    if (reverse) {
      console.log(scrollTop, section.height(), $(window).height());
      scrollTop += section.innerHeight() - $(window).height() - 1;
    }
    $("html, body").animate(
      { scrollTop },
      {
        duration: animationDuration,
        easing: 'swing'
      }
    );
  }

  function requestJumpTo(sectionIndex, reverse = false) {
    if (oldSectionIndex !== sectionIndex) {
      jumpTo(sectionIndex, reverse);
    }
    oldSectionIndex = sectionIndex;
  }

  let oldScrollPositionY = 0;
  document.addEventListener('scroll', function (event) {
    event.preventDefault();
    let peaking = 0;
    let tailing = null;
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      let section = sections[sectionIndex];
      let topLineVisible = section.offsetTop < window.scrollY + window.innerHeight;
      if (topLineVisible) {
        peaking = sectionIndex;
      }

      if (tailing === null) {
        let bottomLineVisible = section.offsetTop + section.clientHeight > window.scrollY;
        if (bottomLineVisible) {
          tailing = sectionIndex;
        }
      }
    }

    if (oldScrollPositionY <= window.scrollY) {
      requestJumpTo(peaking);
    } else {
      requestJumpTo(tailing, true)
    }

    oldScrollPositionY = window.scrollY;
  })
}