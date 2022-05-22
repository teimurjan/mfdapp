const hasContentOverflow = <T extends HTMLElement>(element: T) =>
  element.scrollWidth > element.clientWidth;

export default hasContentOverflow;
