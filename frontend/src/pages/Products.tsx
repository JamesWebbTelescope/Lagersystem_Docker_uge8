import Layout from "../components/Layout";
import type {WarehouseData, InventoryData, ProductData} from "../types/Types";
import {useState, useEffect, useRef} from 'react';
import "./Products.css"
import styles from "../components/SearchBar.module.css";


interface DisplayItem {
  productName: string;
  price: number;
  quantity: number;
  status: string;
  location: string;
}


export default function ProductsPage() {

    const IdRef = useRef('');

    const [displayData, setDisplayData] = useState<DisplayItem[]>([]);    

    const API_URL = import.meta.env.VITE_API_URL;

    const SearchBar = () => {
        const [id, setId] = useState('');
        //const [suggestions, setSuggestions] = useState([]);

        useEffect(() => {
            const fetchSearchBarData = async () => {
                if (id.length > 0) {
                    IdRef.current = id;
                    console.log(id);
                    const results: DisplayItem[] = [];
                    const products = await getProducts()
                    const productbyid =products.find(item => item.id.toString() === IdRef.current)
                    results.push({
                        productName: productbyid.name,
                        price: productbyid.price,
                        quantity: 0,
                        status: productbyid.status,
                        location: "undefined",
                    })
                    setDisplayData(results)
                }
            };
            fetchSearchBarData();
        }, [id]);

        return (
            <div className={styles.container}>
                <input
                    type="text"
                    className={styles.textbox}
                    placeholder="Give an ID"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value);
                        IdRef.current = e.target.value;
                    }}
                />
            </div>
        );
    };

    const getWarehouses = async () =>{
        try{
            const res = await fetch(`${API_URL}/api/warehouse/`)
            const data: WarehouseData[] = await res.json()                        
            return Array.isArray(data) ? data : [];
        }
        catch(error){
            console.log("Error fetching warehouses:", error);
            return [];
        }                    
    }

    // const getProduct = async(id: number) =>{
    //     try{
    //         const res = await fetch(`${API_URL}/api/product/id${id}`)
    //         const data: ProductData = await res.json()
    //         return data;
    //     }
    //     catch(error){
    //         console.log("Error fetching product:", error);
    //     }    
    // }

    const getProducts = async() =>{
        try{
            if (IdRef.current.length > 0) {
                console.log(IdRef.current.length);
                const res = await fetch(`${API_URL}/api/product/`)
                const data: ProductData[] = await res.json()
                return Array.isArray(data) ? data : [];
            }
            else
            {
                console.log(IdRef.current.length);
                const res = await fetch(`${API_URL}/api/product/${IdRef.current}`)
                const data: ProductData[] = await res.json()
                return Array.isArray(data) ? data : [];
            }
        }
        catch(error){
            console.log("Error fetching product:", error);
            return [];
        }    
    }

    const getInventory = async (id: number) => {
        try{
            const res = await fetch(`${API_URL}/api/warehouse/${id}/inventory`)
            const data: InventoryData[] = await res.json()                        
            return Array.isArray(data) ? data : [];
        }
        catch(error){
            console.log("Error fetching inventory:", error);
            return [];
        }    
    }


    
    useEffect(() => {
        async function sleep(ms: number): Promise<void> {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
        const fetchData = async () => {
            const warehouses = await getWarehouses();
            await sleep(2000);
            const results: DisplayItem[] = [];
            const products: ProductData[] = await getProducts();
            await sleep(2000);
            for(const wh of warehouses){
                console.log(`Getting inventory from: ${wh.name}`)
                const currentInventory = await getInventory(wh.id)
                await sleep(2000);
                if(currentInventory){
                    for(const inventory of currentInventory){
                        
                        const product = products.find(item => item.id === inventory.product_id);
                        if(product){
                            results.push({
                                        productName: product.name,
                                        price: product.price,
                                        quantity: inventory.quantity,
                                        status: product.status,
                                        location: wh.name,
                                    });
                        }
                                   
                    }  
                }
            }            
            setDisplayData(results);
        };
        fetchData();
    }, []);


    return (
        <Layout>

            <div>
                <SearchBar />
                <h2>Inventory Overview</h2>


                <table className="table">
                <thead>
                    <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.status}</td>
                        <td>{item.location}</td>
                    </tr>
                    ))}
                </tbody>
                </table>


            </div>

        </Layout>
    );
}