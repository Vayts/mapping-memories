export function getScrollbarWidth(): number {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

export function hideScrollbar(): void {
  const scrollbarWidth = getScrollbarWidth();
  document.body.style.overflowY = 'hidden';
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

export function showScrollbar(): void {
  document.body.style.overflowY = 'scroll';
  document.body.style.paddingRight = '0';
}
