export const styles = {
  icons: {
    fontSize: '1.75em'
  },
  main: (expanded) => ({
    position: 'relative',
    overflow: 'hidden',
    transition: 'all .15s',
    padding: '0 20px',
    marginLeft: expanded ? 240 : 64,
    marginTop: 20
  })
}
