import { useEffect,useState } from 'react';
import useSWR from 'swr';
function LastSalesPage(props){

    const [sales,setSales] = useState(props.sales);
    const[isLoading, setIsLoading] = useState(false);

    // const { data, error } = useSWR(
    //   "https://nextjs-course-e49ff-default-rtdb.firebaseio.com/sales.json"
    // );

    // useEffect(() => {
    //     console.log(data);
    //     if(data){
    //         const transformedSales = [];

    //          for(const key in data)
    //          {
    //             transformedSales.push({id:key,username:data[key].username,volume: data[key].volume,
    //             });
    //         }
    //         setSales(transformedSales);
    //     }
    // },[data]);




    useEffect(() => {

        setIsLoading(true);
        fetch("https://nextjs-course-e49ff-default-rtdb.firebaseio.com/sales.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const transformedSales = [];
            for(const key in data){
                transformedSales.push({id:key,username:data[key].username,volume: data[key].volume,});
            }
            setSales(transformedSales);
            setIsLoading(false);
        });
    },[]);

    //  if (error) {
    //   return <p>Failed To Load</p>;
    // }

    if(!sales && !data){
        return <p> Loading... </p>;
    }

   

    
    return (
        <ul>
            {sales.map((sale) => (<li key={sale.id}>{sale.username}={sale.volume}</li>))}
        </ul>
    );
}

export async function getStaticProps(){
const response = await fetch("https://nextjs-course-e49ff-default-rtdb.firebaseio.com/sales.json")
const data = await response.json();
const transformedSales = [];
for(const key in data){
    transformedSales.push({id:key,username:data[key].username,volume: data[key].volume,});
      }

    return {props: {sales: transformedSales}};
}
export default LastSalesPage;