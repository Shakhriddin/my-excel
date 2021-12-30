function toBtn(btn) {
  const meta = `data-type="button" data-value='${JSON.stringify(btn.value)}'`;
  return `
      <button class="toolbar__btn ${btn.active ? '--active' : ''}"
      ${meta}>
        <i class="${btn.class}" ${meta}></i>
      </button>
`;
}

export function createToolbar(state) {
  const btns = [
    {
      value: {
        fontWeight: state['fontWeight'] === 'bold'
          ? 'normal' : 'bold',
      },
      active: state['fontWeight'] === 'bold',
      class: 'fas fa-bold',
    },
    {
      value: {
        fontStyle: state['fontStyle'] === 'italic'
          ? 'normal' : 'italic',
      },
      active: state['fontStyle'] === 'italic',
      class: 'fas fa-italic',
    },
    {
      value: {
        textDecoration: state['textDecoration'] === 'underline'
          ? 'none' : 'underline',
      },
      active: state['textDecoration'] === 'underline',
      class: 'fas fa-underline',
    },
    {
      value: {textAlign: 'left'},
      active: state['textAlign'] === 'left',
      class: 'fas fa-align-left',
    },
    {
      value: {textAlign: 'center'},
      active: state['textAlign'] === 'center',
      class: 'fas fa-align-center',
    },
    {
      value: {textAlign: 'right'},
      active: state['textAlign'] === 'right',
      class: 'fas fa-align-right',
    },
  ];
  return btns.map(toBtn).join(' ');
}

