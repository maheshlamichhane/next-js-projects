import fs from 'fs';
import path from 'path';
import Link from 'next/link';
function Home(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
    
}

export async function getStaticProps() {
 const filePath=path.join(process.cwd(),'data','dummy-backend.json');
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  if(!data){
    return{
      redirect:{
        destination: '/no-data'
      }
    }
  }

  if(data.products.length === 0){
    return { notFound : true};
  }


  return {
    props: {
      products: data.products
    },
    revalidate: 10
  };


  //  return {
  //    props: {
  //      products: [{ id: "p1", title: "Product 1" }],
  //    },
  //  };

  
}
export default Home;
