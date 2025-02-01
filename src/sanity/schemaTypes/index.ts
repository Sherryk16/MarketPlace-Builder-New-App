import { type SchemaTypeDefinition } from 'sanity'
import featureProduct from '@/sanity/schemaTypes/product'
import latestProducts from '@/sanity/schemaTypes/latestProducts'
import trendingProducts from './trendingProducts'
import topCategory from './topCategory'
import relatedProducts from './relatedProducts'
import products from './products'
import shipment from './shipment'
import order from './order'
import user from './user'
import customer from './customer'
import orders from './orders'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [featureProduct,latestProducts,topCategory,trendingProducts,relatedProducts,products,shipment,order,user,customer,orders],
}
