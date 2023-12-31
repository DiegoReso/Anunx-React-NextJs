
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


const Toasty = ({open, text, severity, onClose=null}) => {
  const handleClose = (event ,reason) =>{
    if(reason === 'clickaway'){
      return
    }
    if(onClose) onClose()
  }

  return (
    
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open} 
        autoHideDuration={4000} 
        onClose={handleClose}>
        <MuiAlert 
          elevation={6} 
          variant='filled' 
          onClose={handleClose} 
          severity={severity}>
            {text}
        </MuiAlert>
      </Snackbar>
   
  );
}

export default Toasty