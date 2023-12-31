import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import TemplateDefault from '../../../src/templates/Default'
import Carousel from 'react-material-ui-carousel'

import { makeStyles } from '@material-ui/core/styles'
import dbConnect from '../../../src/utils/dbConnect'
import ProductsModel from  '../../../src/models/products'
import { formatCurrency } from '../../../src/utils/currency'

const useStyles = makeStyles((theme)=>({
  box:{
    backgroundColor: theme.palette.background.white,
    padding:theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  productName:{
    margin: '15px 0',
  },
  price:{
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  card:{
    height: '100%'
  },
  cardMedia:{
    paddingTop: '56%'
  },
  
}))

const Products =({product}) =>{

  const classes= useStyles()

  return(
   <TemplateDefault>
      <Container maxWidth="lg">
        <Grid container spacing={3}> 
          <Grid item xs={8}>
            <Box className={classes.box}>
              <Carousel
                autoPlay={false}
                animation="slide"
              >
                {
                  product.files.map(file=>(
                    <Card key={product.name} className={classes.card} >
                  <CardMedia
                    className={classes.cardMedia}
                    image={`/uploads/${file.name}`}
                    title={product.title}
                  />
                </Card>
                  ))
                }
              
              </Carousel>
            </Box>
         

        
            <Box className={classes.box}>
              <Typography component="span" variant="caption" className={classes.titles} >Publicado 16 de junho de 2021</Typography>
                
              <Typography component="h4" variant="h4" className={classes.productName}>{product.title}</Typography>

              <Typography component="h4" variant="h4" className={classes.price} >{formatCurrency(product.price)}</Typography>
              
              <Chip label={product.category}/>
            </Box>

            <Box className={classes.box}>
              <Typography component="h6" variant="h6" >
                {product.description}
              </Typography>

            
            </Box>
          </Grid>

          <Grid item sx={4}>
            <Card elevation={0}  className={classes.box}>
              <CardHeader 
                avatar={
                  <Avatar src={product.user.image}>
                    {
                      product.user.image || product.user.name[0]
                    }
                  </Avatar>
                }
                title={product.user.name}
                subheader={product.user.email}
              />
              <CardMedia
                image={product.user.image}
                title={product.user.name}
              />
            </Card>
            
            <Box className={classes.box}>

              <Typography component="h6" variant="h6">
                Localização
              </Typography>

            </Box>

          </Grid>

        </Grid>
      </Container>
   </TemplateDefault>
  )
}


export async function getServerSideProps({query}){
  const {id} = query
    await dbConnect()

    const product = await ProductsModel.findOne({_id:id})

    return{
      props:{
        product : JSON.parse(JSON.stringify(product))
      }
    }

}

export default Products