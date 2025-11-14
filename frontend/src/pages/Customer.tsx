import Layout from "../components/Layout";
import type { WarehouseData, InventoryData, CustomerData  } from "../types/Types";
import { useRef, useState, useEffect} from 'react';
//import SearchBar from "../components/SearchBar"
import "./Customer.css"
import styles from "../components/SearchBar.module.css";

interface DisplayItem {
    id: number,
    name: string,
    email: string,
}



export function CustomerPage() {
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
                    const customer = await getCustomers()
                    const customerbyid =customer.find(item => item.id.toString() === IdRef.current)
                    results.push({
                        id: customerbyid.id,
                        name: customerbyid.name,
                        email: customerbyid.email,
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

    const getWarehouses = async () => {
        try {
            const res = await fetch(`${API_URL}/api/warehouse/`)
            const data: WarehouseData[] = await res.json()
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.log("Error fetching warehouses:", error);
            return [];
        }
    }

    /*const getCustomerByID = async(id: number) =>{
         try{
             const res = await fetch(`${API_URL}/api/customer/id${id}`)
             const data: CustomerData = await res.json()
             return data;
         }
         catch(error){
             console.log("Error fetching product:", error);
         }
     }*/

    const getCustomers = async () => {
        console.log("Hello!");
        try {
            if (IdRef.current.length > 0) {
                const res = await fetch(`${API_URL}/api/customer/`)
                const data: CustomerData[] = await res.json()
                return Array.isArray(data) ? data : [];
            }
            else
            {
                const res = await fetch(`${API_URL}/api/customer/${IdRef.current}`)
                const data: CustomerData[] = await res.json()
                return Array.isArray(data) ? data : [];
            }
        } catch (error) {
            console.log("Error fetching customers:", error);
            return [];
        }
    }

    const getInventory = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/api/warehouse/${id}/inventory`)
            const data: InventoryData[] = await res.json()
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.log("Error fetching inventory:", error);
            return [];
        }
    }


    useEffect(() => {
        async function sleep(ms: number): Promise<void> {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        const fetchData = async () => {
            console.log("Get customers");
            const warehouses = await getWarehouses();
            await sleep(2000);
            const results: DisplayItem[] = [];
            const customers = await getCustomers();
            await sleep(2000);
            for (const wh of warehouses) {
                console.log(`Getting inventory from: ${wh.name}`)
                const currentInventory = await getInventory(wh.id)
                await sleep(2000);
                if (currentInventory) {
                    for (const inventory of currentInventory) {

                        const customer = customers.find(item => item.id === inventory.product_id);
                        if (customer) {
                            results.push({
                                id: customer.id,
                                name: customer.name,
                                email: customer.email,
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
            <SearchBar/>
            <div>
                <h2>Inventory Overview</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>


            </div>

        </Layout>
    );
}