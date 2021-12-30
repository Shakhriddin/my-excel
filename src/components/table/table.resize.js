import {$} from '../../core/dom';

export function resizerHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const resizerType = $resizer.data.resize;
    let value;
    const sideProp = resizerType === 'col' ? 'bottom' : 'right';
    $resizer.css({
      opacity: 1,
      [sideProp]: -$root.$element.scrollHeight + 'px',
    });

    document.onmousemove = e => {
      if (resizerType === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({right: -delta + 'px'});
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (resizerType === 'col') {
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(cell => {
              cell.style.width = value + 'px';
            });
        $parent.css({
          width: value + 'px',
        });
      } else {
        $parent.css({
          height: value + 'px',
        });
      }

      resolve({
        value,
        resizerType,
        id: $parent.data[resizerType],
      });

      $resizer.css({
        opacity: '',
        right: '',
        bottom: '',
      });
    };
  });
}
