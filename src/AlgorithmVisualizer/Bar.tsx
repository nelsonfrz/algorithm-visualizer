function Bar(props: any) {
  return (<div 
    onMouseEnter={e => {
    (e.target as HTMLElement).style.backgroundColor = 'gray';
    }} 

    onMouseLeave={e => {
      (e.target as HTMLElement).style.backgroundColor = 'red';
      }}

    style={{
      backgroundColor: 'red',
      height: props.height,
      width: props.width,
      border: '1px solid gray',
      transition: '.4s all',
      borderRadius: '2px 2px 0 0',
    }} />);
}

export default Bar;
