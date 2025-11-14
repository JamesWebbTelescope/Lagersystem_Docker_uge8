import mysql.connector
from database_commands.product import ProductModel
from database_commands.orders import OrdersModel
from database_commands.admin import AdminModel
from database_commands.customers import CustomersModel
from database_commands.warehouse_inventory import WarehuseInventoryModel
from database_commands.warehouse import WarehouseModel

class DatabaseManager:
    def __init__(self, host, user, password, dbname):
        self.host = host
        self.user = user
        self.password = password
        self.dbname = dbname
        self.mydb = None

        self.product = ProductModel(self)
        self.orders = OrdersModel(self)
        self.admin = AdminModel(self)
        self.customers = CustomersModel(self)
        self.warehouse = WarehouseModel(self)
        self.warehouse_inventory = WarehuseInventoryModel(self)
        try:
            self.get_connection()
            if self.mydb is not None:
                self.is_connected = True
            else:
                self.is_connected = False

        except Exception as e:
            print(f"Could not connect to database: {dbname}")
            self.is_connected = False
 

    def get_connection(self):
        try:
            if not self.mydb or not self.mydb.is_connected():
                self.mydb = mysql.connector.connect(
                    host=self.host,
                    user=self.user,
                    password=self.password,
                    database=self.dbname
                )
            return self.mydb
        except Exception as e:
            print(f"Could not get sql connection: {e}")
            return None

        
    
    