import {
  Box,
  Typography,
  IconButton, 
 } from '@material-ui/core'
 import { DeleteForever } from '@material-ui/icons'
import { useDropzone } from 'react-dropzone'
import useStyles from './style'

const FileUpload = ({files,errors,touched,setFieldValue})=>{
const classes = useStyles()

  const {getRootProps,getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles)=>{
      const newFiles = acceptedFiles.map( file => Object.assign(file,{
        preview :URL.createObjectURL(file)
      }))

      setFieldValue('files',[
        ...files,
        ...newFiles,
      ])
    }
  })


  const handleRemoveFile = filePath => {
    const newfilesState = files.filter( file => file.path !== filePath )

    setFieldValue('files', newfilesState)
  }

  return(
    <>
      <Typography component="h6" variant="h6" color={errors && touched ? 'error' : 'textPrimary'}>
        Imagens
      </Typography>
      <Typography component="div" variant="body2" color={errors && touched ? 'error' : 'textPrimary'}>
        A primeira imagem é a foto principal do seu anúncio.
      </Typography>
      {
        errors && touched
        ? <Typography variant="body2" color='error' gutterBottom>{errors}</Typography>
        : null
      }
      <Box className={classes.thumbsContainer}>
        <Box className={classes.dropzone} {...getRootProps()}>
          <input name='files' {...getInputProps()} />
          <Typography color={errors && touched ? 'error' : 'textPrimary'}>
            Clique ou arraste para adicionar imagens
          </Typography>
        </Box>

        {
          files.map((file,index) =>(
            <Box
            key={file.name}
            className={classes.thumb}
            style={{backgroundImage: `url(${file.preview})`}}>

            {
              index === 0
              ? (<Box className={classes.mainImage}>
                <Typography variant='body' color='secondary'> 
                  Principal
                </Typography>
              </Box>  )

              : null
            }  
            
            <Box className={classes.mask}>
              <IconButton color='secondary'
                onClick={()=> handleRemoveFile(file.path)}
              >
                <DeleteForever fontSize='large'/>
              </IconButton>
            </Box>
          </Box>
          ))
        }
        
      </Box>
    </>
  )
}


export default FileUpload